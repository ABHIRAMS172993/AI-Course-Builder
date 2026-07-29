from django.db.models import Max, Q , Avg 
import uuid

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .services import generate_learning_roadmap
from .models import LearningRoadmap, Certificate,ResourceProgress,QuizAttempt,UserAnswer,SkillGap,Roadmap

from .serializers import (
    LearningRoadmapSerializer,
    GenerateRoadmapSerializer,
    CompleteWeekSerializer,
    CompleteResourceSerializer,
    CertificateSerializer,
)

from resources.models import Resource,Topic,QuizQuestion
from resources.serializers import ResourceSerializer,QuizQuestionSerializer

from courses.models import Course

from django.utils import timezone
# NOTE: CompleteWeekSerializer is imported a second time here
# (already imported above alongside the other serializers) --
# harmless, just redundant.
from .serializers import CompleteWeekSerializer,ProfileSerializer

from collections import defaultdict

import io
import os

from django.conf import settings
from django.http import FileResponse

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.utils import ImageReader
from reportlab.lib.colors import HexColor




class GenerateRoadmapView(APIView):

    """ 
    Generates a brand-new learning roadmap for the user (via the
    Gemini-backed generate_learning_roadmap() service) and persists
    it as a Roadmap header row plus one LearningRoadmap row per week,
    each pre-populated with ResourceProgress rows for every Resource
    tagged to that week's topic.
 
    A user can only have ONE active (incomplete) roadmap at a time --
    they must finish their current roadmap before generating another.

    """

    permission_classes = [IsAuthenticated]

    def post(self, request):

        """ 
        POST /roadmap/generate/
 
        Body: { goal, skill_level, learning_style,
                weekly_study_hours, preferred_domains, course_id? }
 
        Steps:
            1. Validate input via GenerateRoadmapSerializer.
            2. Check the user's most recent roadmap_id (if any) --
               if it exists and isn't fully completed yet, reject
               the request with a 400.
            3. Call the roadmap-generation service to get a list of
               weekly topics/hours.
            4. Create a new Roadmap "header" row (metadata: goal,
               course, timestamp) and one LearningRoadmap row per
               generated week, matched to an existing Topic by name
               (weeks whose topic name doesn't match anything in the
               DB are silently skipped).
            5. For each created week, attach ResourceProgress rows
               for every Resource belonging to that topic, so
               progress can be tracked resource-by-resource later.
 
        Returns:
            400 if input validation fails, an active roadmap already
                exists, or the generation service itself returns an
                error payload.
            200 with the serialized list of newly created
                LearningRoadmap weeks (NOT wrapped with the Roadmap
                header info -- see MyRoadmapsView/RoadmapDetailView
                for that).

        """

        serializer = GenerateRoadmapSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        # -------------------------------------------------
        # Check if user already has an active roadmap
        # -------------------------------------------------

        latest = LearningRoadmap.objects.filter(
            user=request.user
        ).aggregate(
            Max("roadmap_id")
        )

        latest_roadmap_id = latest["roadmap_id__max"]

        if latest_roadmap_id is not None:

            current_roadmap = LearningRoadmap.objects.filter(
                user=request.user,
                roadmap_id=latest_roadmap_id
            )

            total_weeks = current_roadmap.count()

            completed_weeks = current_roadmap.filter(
                completed=True
            ).count()

            if completed_weeks != total_weeks:

                return Response(
                    {
                        "error": "You already have an active roadmap. Complete your current roadmap before generating a new one."
                    },
                    status=400
                )

        # -------------------------------------------------
        # Generate roadmap using Gemini
        # -------------------------------------------------

        roadmap = generate_learning_roadmap(
            goal=data["goal"],
            skill_level=data["skill_level"],
            learning_style=data["learning_style"],
            weekly_hours=data["weekly_study_hours"],
            preferred_domains=data["preferred_domains"],
        )

        if isinstance(roadmap, dict) and roadmap.get("error"):
            return Response(roadmap, status=400)

        roadmap_id = (latest_roadmap_id or 0) + 1

        # Find the selected course (if one was sent)
        course = None

        course_id = request.data.get("course_id")

        if course_id:
            try:
                course = Course.objects.get(id=course_id)
            except Course.DoesNotExist:
                course = None

        
        # Save a new roadmap entry for the logged-in user.
        # Stores the generated roadmap ID and the user's selected career goal.
        # 'course=None' indicates that no specific course is associated at the time of roadmap creation.
        Roadmap.objects.create(
            user=request.user,
            roadmap_id=roadmap_id,
            career_goal=data["goal"],
            course=None
        )

        created = []

        for week_number, item in enumerate(roadmap, start=1):

            topic = Topic.objects.filter(
                name=item["topic"]
            ).first()

            if topic is None:
                continue

            roadmap_item = LearningRoadmap.objects.create(
                user=request.user,
                roadmap_id=roadmap_id,
                week=week_number,
                topic=topic,
                hours=item.get(
                    "hours",
                    data["weekly_study_hours"]
                ),
            )

            created.append(roadmap_item)

            # Attach all resources for the topic
            resources = Resource.objects.filter(
                topic=topic
            )

            for resource in resources:

                ResourceProgress.objects.get_or_create(
                    roadmap=roadmap_item,
                    resource=resource,
                )

        return Response(
            LearningRoadmapSerializer(
                created,
                many=True
            ).data
        )
    
# class MyRoadmapsView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self, request):

#         roadmaps = LearningRoadmap.objects.filter(
#             user=request.user
#         ).order_by("roadmap_id", "week")

#         serializer = LearningRoadmapSerializer(
#             roadmaps,
#             many=True
#         )

#         return Response(serializer.data)



class MyRoadmapsView(APIView):

    """ 
     Lists all roadmaps (past and present) the user has generated,
    newest first, each with a short summary rather than full week
    detail (see RoadmapDetailView for that).

    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        """ 
        GET /roadmap/my-roadmaps/
 
        Returns:
            200 with a list of roadmap summaries:
                - roadmap_id, goal, course (title or None)
                - created_at
                - weeks: total week count
                - completed: True only if EVERY week is completed
                  (i.e. no incomplete weeks remain)

        """

        roadmaps = Roadmap.objects.filter(
            user=request.user
        ).order_by("-created_at")

        response = []

        for roadmap in roadmaps:

            weeks = LearningRoadmap.objects.filter(
                user=request.user,
                roadmap_id=roadmap.roadmap_id
            )

            response.append({

                "roadmap_id": roadmap.roadmap_id,

                "goal": roadmap.career_goal,

                "course": roadmap.course.title if roadmap.course else None,

                "created_at": roadmap.created_at,

                "weeks": weeks.count(),

                "completed": weeks.filter(completed=False).count() == 0,

            })

        return Response(response)



class RoadmapDetailView(APIView):

    """ 
    Full detail view for a single roadmap: its metadata plus every
    week (with nested resources), for a roadmap "overview" page.

    """

    permission_classes = [IsAuthenticated]

    def get(self, request, roadmap_id):

        """ 
        GET /roadmap/<roadmap_id>/
 
        NOTE: unlike most other views in this file, this doesn't
        wrap the Roadmap.objects.get() call in a try/except --
        if the roadmap_id doesn't exist (or belongs to a different
        user), this will raise an unhandled Roadmap.DoesNotExist,
        resulting in a 500 error rather than a clean 404.
 
        Returns:
            200 with roadmap_id, goal, course, created_at, and the
            full serialized list of weeks (ordered by week number).

        """

        roadmap = Roadmap.objects.get(
            user=request.user,
            roadmap_id=roadmap_id
        )

        weeks = LearningRoadmap.objects.filter(
            user=request.user,
            roadmap_id=roadmap_id
        ).order_by("week")

        return Response({

            "roadmap_id": roadmap.roadmap_id,
            "goal": roadmap.career_goal,
            "course": roadmap.course.title if roadmap.course else None,
            "created_at": roadmap.created_at,
            "weeks": LearningRoadmapSerializer(weeks, many=True).data

        })




class DeleteRoadmapView(APIView):

    """Deletes all LearningRoadmap (week) rows for a given roadmap_id
    belonging to the user."""

    permission_classes = [IsAuthenticated]

    def delete(self, request, roadmap_id):

        """ 
        DELETE /roadmap/<roadmap_id>/delete/
 
        NOTE: this deletes the LearningRoadmap week rows, but does
        NOT delete the corresponding Roadmap header row (created in
        GenerateRoadmapView) -- that row would be left behind as an
        orphaned entry with no weeks. Worth checking whether
        MyRoadmapsView should filter those out, or whether this
        should also delete the Roadmap row.
 
        Returns:
            404 if no weeks exist for this roadmap_id/user.
            200 with a success message once deleted.

        """

        roadmap = LearningRoadmap.objects.filter(

            user=request.user,

            roadmap_id=roadmap_id

        )

        if not roadmap.exists():

            return Response(
                {"error":"Roadmap not found"},
                status=404
            )

        roadmap.delete()

        return Response({

            "message":"Roadmap deleted successfully"

        })




class GenerateCertificateView(APIView):

    """ 
    Generates (or refreshes) a certificate for a fully-completed
    roadmap. A user can only get a certificate once all weeks are
    marked completed; calling this again for the same roadmap
    updates the existing certificate's stats rather than duplicating it.

    """

    permission_classes = [IsAuthenticated]

    def post(self, request):

        """ 
        POST /roadmap/certificate/generate/
 
        Body: { "roadmap_id": ... }
 
        Steps:
            1. Validate roadmap_id is supplied and belongs to a real
               Roadmap owned by this user.
            2. Confirm every week of that roadmap is completed.
            3. Compute the average quiz percentage across all
               QuizAttempts tied to this roadmap_id.
            4. get_or_create the Certificate; if one already existed,
               refresh its course_name/career_goal/average score to
               the latest values instead of leaving stale data.
 
        Returns:
            400 if roadmap_id is missing, or if any week is still
                incomplete.
            404 if the roadmap or its weeks don't exist.
            200 with { "already_generated": bool, "certificate": {...} }
                -- already_generated is True if this call reused an
                existing certificate rather than creating a new one.

        """

        roadmap_id = request.data.get("roadmap_id")

        if not roadmap_id:
            return Response(
                {
                    "error": "roadmap_id is required"
                },
                status=400
            )

        # Fetch roadmap metadata
        try:
            roadmap = Roadmap.objects.get(
                user=request.user,
                roadmap_id=roadmap_id
            )

        except Roadmap.DoesNotExist:
            return Response(
                {
                    "error": "Roadmap not found"
                },
                status=404
            )

        # Fetch roadmap weeks
        weeks = LearningRoadmap.objects.filter(
            user=request.user,
            roadmap_id=roadmap_id
        )

        if not weeks.exists():
            return Response(
                {
                    "error": "Roadmap weeks not found"
                },
                status=404
            )

        total = weeks.count()

        completed = weeks.filter(
            completed=True
        ).count()

        if completed != total:
            return Response(
                {
                    "error": "Complete all roadmap weeks before generating certificate."
                },
                status=400
            )

        
        # Average across ALL QuizAttempts ever made against this
        # roadmap_id (not just the latest attempt per week, and not
        # restricted to passed attempts).
        average_percentage = QuizAttempt.objects.filter(
            roadmap__user=request.user,
            roadmap__roadmap_id=roadmap_id
        ).aggregate(
            avg=Avg("percentage")
        )["avg"] or 0

        certificate, created = Certificate.objects.get_or_create(

            user=request.user,
            roadmap_id=roadmap_id,

            defaults={
                "course_name": roadmap.course,
                "career_goal": roadmap.career_goal,
                "certificate_number": str(uuid.uuid4()),
                "average_quiz_percentage": round(average_percentage, 2)
            }

        )

        # If certificate already exists, update latest values
        if not created:

            certificate.course_name = roadmap.course
            certificate.career_goal = roadmap.career_goal
            certificate.average_quiz_percentage = round(
                average_percentage,
                2
            )

            certificate.save()

        serializer = CertificateSerializer(certificate)

        return Response({
            "already_generated": not created,
            "certificate": serializer.data
        })

    

from django.db.models import Sum

class CertificateView(APIView):

    """
    Lists all certificates the user has earned across every
    completed roadmap.

    Before returning the certificates, this view recalculates the
    latest average quiz percentage for each roadmap and updates the
    stored certificate if the value has changed.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        """
        GET /roadmap/certificates/

        Returns:
            404 if the user has no certificates.
            200 with all certificates and updated quiz averages.
        """

        certificates = Certificate.objects.filter(user=request.user)

        if not certificates.exists():
            return Response(
                {
                    "error": "No certificates found."
                },
                status=404
            )

        # --------------------------------------------------------
        # Update the quiz average for every certificate
        # --------------------------------------------------------

        for certificate in certificates:

            # Total roadmap weeks
            weeks = LearningRoadmap.objects.filter(
                user=request.user,
                roadmap_id=certificate.roadmap_id
            )

            total_weeks = weeks.count()

            # All quiz attempts for this roadmap
            attempts = QuizAttempt.objects.filter(
                roadmap__user=request.user,
                roadmap__roadmap_id=certificate.roadmap_id
            )

            total_percentage = attempts.aggregate(
                total=Sum("percentage")
            )["total"] or 0

            print("total_percentage",total_percentage)
            print("total weeks ---",total_weeks)

            # Treat unattended quizzes as 0%
            average_percentage = (
                total_percentage / total_weeks
                if total_weeks > 0 else 0
            )

            certificate.average_quiz_percentage = round(
                average_percentage,
                2
            )

            certificate.save(
                update_fields=["average_quiz_percentage"]
            )

        serializer = CertificateSerializer(
            certificates,
            many=True
        )

        return Response({
            "certificates": serializer.data
        })




class DownloadCertificateView(APIView):

    """ 
    Renders a single certificate as a downloadable PDF, drawing the
    student's name, course/career info, quiz score, date, and
    certificate number on top of a fixed background template image.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, roadmap_id):

        """
        GET /roadmap/certificate/<roadmap_id>/download/
 
        Returns:
            404 if no certificate exists for this user/roadmap_id.
            A FileResponse (PDF, as_attachment) on success.

        """

        try:
            certificate = Certificate.objects.get(
                user=request.user,
                roadmap_id=roadmap_id
            )

        except Certificate.DoesNotExist:

            return Response(
                {
                    "error": "Certificate not found"
                },
                status=404
            )


        buffer = io.BytesIO()

        width, height = landscape(A4)

        pdf = canvas.Canvas(
            buffer,
            pagesize=landscape(A4)
        )

        # ------------------------------
        # Background Template
        # ------------------------------

        template = os.path.join(
            settings.BASE_DIR,
            "static",
            "certificates",
            "certificate_template.png"
        )

        pdf.drawImage(
            ImageReader(template),
            0,
            0,
            width=width,
            height=height
        )

        # ====================================================
        # STUDENT NAME
        # ====================================================

        pdf.setFillColor(HexColor("#0B1F3A"))

        pdf.setFont(
            "Times-Bold",
            34
        )

        pdf.drawCentredString(

            width / 2,

            275,

            request.user.get_full_name() or request.user.username

        )

        # ====================================================
        # COURSE NAME (WHITE RIBBON)
        # ====================================================

        pdf.setFillColor(HexColor("#FFFFFF"))

        pdf.setFont(
            "Helvetica-Bold",
            21
        )

        pdf.drawCentredString(

            width / 2,

            325,

            certificate.career_goal
            if certificate.course_name
            else "Custom Roadmap"

        )

        # ====================================================
        # CAREER GOAL
        # ====================================================

        pdf.setFillColor(HexColor("#F4F6F8"))

        pdf.setFont(
            "Helvetica-Bold",
            18
        )

        pdf.drawCentredString(

            width / 2,

            214,

            certificate.career_goal

        )

        # ====================================================
        # SCORE
        # ====================================================

        pdf.setFillColor(HexColor("#163B63"))

        pdf.setFont(
            "Helvetica-Bold",
            16
        )


        pdf.drawString(

            115,

            155,

            f"{certificate.average_quiz_percentage}"

        )

        # ====================================================
        # DATE
        # ====================================================

        pdf.setFont(
            "Helvetica-Bold",
            15
        )

        pdf.drawString(

            115,

            104,

            certificate.issued_at.strftime("%d %B %Y")

        )

        # ====================================================
        # CERTIFICATE NUMBER
        # ====================================================

        pdf.setFont(
            "Helvetica",
            7
        )

        pdf.drawString(

            115,

            60,

            certificate.certificate_number

        )

        pdf.save()

        buffer.seek(0)

        return FileResponse(

            buffer,

            as_attachment=True,

            filename="certificate.pdf"

        )


    

class CompleteRoadmapWeekView(APIView):

    """ 
    Marks a single roadmap week as completed directly (independent
    of whether all its individual resources are marked done -- see
    CompleteResourceView, which auto-completes/un-completes the week
    based on resource progress instead).

    """

    permission_classes = [IsAuthenticated]

    def post(self, request):

        """ 
        POST /roadmap/complete-week/
 
        Body: { "roadmap_id": ..., "week": ... }
 
        Returns:
            404 if no matching week is found for this user.
            200 with the updated week's completion status/timestamp.

        """

        serializer = CompleteWeekSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        roadmap_id = serializer.validated_data["roadmap_id"]
        week = serializer.validated_data["week"]

        try:

            roadmap = LearningRoadmap.objects.get(
                user=request.user,
                roadmap_id=roadmap_id,
                week=week
            )

        except LearningRoadmap.DoesNotExist:

            return Response(
                {
                    "error": "Roadmap week not found."
                },
                status=404
            )

        roadmap.completed = True
        roadmap.completed_at = timezone.now()
        roadmap.save()

        return Response({

            "message": "Week marked as completed.",

            "roadmap_id": roadmap.roadmap_id,

            "week": roadmap.week,

            "completed": roadmap.completed,

            "completed_at": roadmap.completed_at

        })
    



class CompleteResourceView(APIView):

    """ 
    Toggles a single resource's completion status, and automatically
    keeps the parent week's `completed` flag in sync: the week is
    marked completed only when EVERY resource under it is completed,
    and un-completed again the moment any resource is un-checked.

    """

    permission_classes = [IsAuthenticated]

    def post(self, request):

        """
        POST /roadmap/complete-resource/
 
        Body: { "resource_progress_id": ... }
 
        Behavior: this TOGGLES the resource (completed -> not
        completed, or vice versa) rather than always marking it
        done -- calling this twice on the same resource undoes the
        first call.
 
        Returns:
            404 if no matching ResourceProgress is found for this
                user.
            200 with the resource's new completed state.

        """

        serializer = CompleteResourceSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        resource_progress_id = serializer.validated_data[
            "resource_progress_id"
        ]

        try:

            progress = ResourceProgress.objects.get(
                id=resource_progress_id,
                roadmap__user=request.user
            )

        except ResourceProgress.DoesNotExist:

            return Response(
                {
                    "error": "Resource not found."
                },
                status=404
            )

        progress.completed = not progress.completed

        if progress.completed:
            progress.completed_at = timezone.now()

        else:
            progress.completed_at = None

        progress.save()

        # Automatically complete week if all resources are completed

        roadmap = progress.roadmap

        total_resources = ResourceProgress.objects.filter(
            roadmap=roadmap
        ).count()

        completed_resources = ResourceProgress.objects.filter(
            roadmap=roadmap,
            completed=True
        ).count()

        if total_resources > 0 and completed_resources == total_resources:

            roadmap.completed = True
            roadmap.completed_at = timezone.now()
        else:

            roadmap.completed = False
            roadmap.completed_at = None

        roadmap.save()

        return Response({

            "message": "Resource updated.",

            "resource_progress_id": progress.id,

            "completed": progress.completed

        })
    

class CurrentRoadmapView(APIView):

    """ 
    Returns the full week-by-week breakdown of the user's most
    recently generated roadmap (highest roadmap_id) -- used for the
    "your current roadmap" page.

    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        """
        GET /roadmap/current/
 
        Returns:
            200 with [] if the user has never generated a roadmap.
            200 with the serialized list of weeks (ordered by week
                number) for their latest roadmap otherwise.

        """

        latest = LearningRoadmap.objects.filter(
            user=request.user
        ).aggregate(
            Max("roadmap_id")
        )

        if latest["roadmap_id__max"] is None:

            return Response([])

        roadmap = LearningRoadmap.objects.filter(

            user=request.user,

            roadmap_id=latest["roadmap_id__max"]

        ).order_by("week")

        serializer = LearningRoadmapSerializer(
            roadmap,
            many=True
        )

        return Response(serializer.data)
    

class RoadmapProgressView(APIView):

    """ 
    Returns just the completion percentage for the user's latest
    roadmap -- a lighter-weight alternative to CurrentRoadmapView
    when a caller only needs the progress number (e.g. a progress
    bar widget), not full week/resource detail.

    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        """
        GET /roadmap/progress/
 
        Returns:
            200 with {completed: 0, total: 0, percentage: 0} if the
                user has no roadmap yet.
            200 with the latest roadmap's completed/total week counts
                and completion percentage otherwise.

        """

        latest = LearningRoadmap.objects.filter(
            user=request.user
        ).aggregate(
            Max("roadmap_id")
        )

        if latest["roadmap_id__max"] is None:

            return Response({

                "completed":0,

                "total":0,

                "percentage":0

            })

        roadmap = LearningRoadmap.objects.filter(

            user=request.user,

            roadmap_id=latest["roadmap_id__max"]

        )

        total = roadmap.count()

        completed = roadmap.filter(
            completed=True
        ).count()

        percentage = 0

        if total > 0:

            percentage = round(

                (completed / total) * 100,

                2

            )

        return Response({

            "completed":completed,

            "total":total,

            "percentage":percentage

        })
    

class GenerateQuizView(APIView):

    """ 
    Starts a new quiz attempt for a given roadmap week: picks 5
    random questions from that week's topic and creates a
    QuizAttempt to track the attempt. Retakes are blocked once the
    user has already passed a quiz for that week.

    """

    permission_classes = [IsAuthenticated]

    def post(self, request):

        """
        POST /quiz/generate/
 
        Body: { "roadmap_id": ..., "week": ... }
 
        Returns:
            400 if roadmap_id/week are missing, or if the user has
                already passed (percentage >= 60) a previous attempt
                for this exact week.
            404 if the week doesn't exist, or if its topic has no
                quiz questions available.
            200 with { attempt_id, topic, questions } -- questions
                are serialized WITHOUT the correct answer (see
                QuizQuestionSerializer).

        """

        roadmap_id = request.data.get("roadmap_id")
        week = request.data.get("week")

        if roadmap_id is None or week is None:
            return Response(
                {"error": "roadmap_id and week are required"},
                status=400
            )

        try:

            roadmap = LearningRoadmap.objects.get(
                user=request.user,
                roadmap_id=roadmap_id,
                week=week
            )

        except LearningRoadmap.DoesNotExist:

            return Response(
                {"error": "Roadmap not found"},
                status=404
            )

        # --------------------------------------------
        # Prevent another attempt if already passed
        # --------------------------------------------

        passed_attempt = QuizAttempt.objects.filter(
            roadmap=roadmap,
            percentage__gte=60
        ).exists()

        if passed_attempt:

            return Response(
                {
                    "error": "You have already passed this quiz. Retakes are not allowed."
                },
                status=400
            )

        # --------------------------------------------

        questions = QuizQuestion.objects.filter(
            topic=roadmap.topic
        ).order_by("?")[:5]

        if not questions.exists():

            return Response(
                {"error": "No quiz available for this topic"},
                status=404
            )

        attempt = QuizAttempt.objects.create(

            roadmap=roadmap,
            topic=roadmap.topic,
            total_questions=questions.count()

        )
 
        serializer = QuizQuestionSerializer(
            questions,
            many=True
        )

        return Response({

            "attempt_id": attempt.id,
            "topic": roadmap.topic.name,
            "questions": serializer.data

        })
    


class SubmitQuizView(APIView):

    """Grades a submitted quiz attempt, records per-question answers,
    and updates the user's SkillGap tracking based on pass/fail."""

    permission_classes = [IsAuthenticated]

    def post(self, request):

        """
        POST /quiz/submit/
 
        Body: {
            "attempt_id": ...,
            "answers": [
                { "question_id": ..., "selected_answer": 0-3 },
                ...
            ]
        }
 
        Grading behavior:
            - "selected_answer" is expected to be an INDEX (0-3),
              converted to a letter via letters[index] and compared
              against question.correct_answer.
            - Any question_id that doesn't exist is silently skipped
              (no error, no answer recorded for it).
            - Questions omitted from "answers" entirely count as
              incorrect, since the score is divided by
              attempt.total_questions (the originally generated
              count), not len(answers).
            - Any previous UserAnswers for this attempt are deleted
              first, so resubmitting an attempt replaces prior
              answers rather than appending to them.
 
        After grading:
            - Passing (percentage >= 60) clears any existing
              SkillGap for this roadmap/topic.
            - Failing creates/updates a SkillGap with a generic
              weakness note and a "revise + retake" recommendation.
 
        NOTE: "selected_answer" is used as `int(...)` to index
        directly into `letters = ["A","B","C","D"]` with no bounds
        checking -- a value outside 0-3 (or non-numeric) will raise
        an uncaught IndexError/ValueError for that request.
 
        Returns:
            400 if attempt_id is missing.
            404 if no matching QuizAttempt is found for this user.
            200 with { attempt_id, score, total, percentage, passed }.

        """

        attempt_id = request.data.get("attempt_id")
        answers = request.data.get("answers", [])

        if attempt_id is None:
            return Response(
                {"error": "attempt_id is required."},
                status=400
            )

        try:
            attempt = QuizAttempt.objects.get(
                id=attempt_id,
                roadmap__user=request.user
            )

        except QuizAttempt.DoesNotExist:
            return Response(
                {"error": "Quiz attempt not found."},
                status=404
            )

        roadmap = attempt.roadmap

        # Use total generated questions, not answered questions
        score = 0
        total = attempt.total_questions

        # Remove previous answers
        attempt.answers.all().delete()

        letters = ["A", "B", "C", "D"]

        for answer in answers:

            try:
                question = QuizQuestion.objects.get(
                    id=answer["question_id"]
                )

            except QuizQuestion.DoesNotExist:
                continue

            selected_letter = letters[int(answer["selected_answer"])]

            correct = selected_letter == question.correct_answer

            if correct:
                score += 1

            UserAnswer.objects.create(
                attempt=attempt,
                question=question,
                selected_answer=selected_letter,
                is_correct=correct
            )

        # Skipped questions automatically count as incorrect
        percentage = (
            round((score / total) * 100, 2)
            if total > 0 else 0
        )

        attempt.score = score
        attempt.percentage = percentage
        attempt.passed = percentage >= 60
        attempt.completed_at = timezone.now()
        attempt.save()

        if attempt.passed:

            SkillGap.objects.filter(
                roadmap=roadmap,
                topic=roadmap.topic
            ).delete()

        else:

            SkillGap.objects.update_or_create(
                roadmap=roadmap,
                topic=roadmap.topic,
                defaults={
                    "weakness": "Needs improvement",
                    "recommendation": (
                        f"Revise {roadmap.topic.name} and retake the quiz."
                    )
                }
            )

        return Response({

            "attempt_id": attempt.id,
            "score": score,
            "total": total,
            "percentage": percentage,
            "passed": attempt.passed

        })    


class QuizResultsView(APIView):

    """
    Lists every quiz attempt the user has ever made, most recently
    completed first -- a history/results page.

    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        """ 
        GET /quiz/results/
 
        Returns:
            200 with a list of attempts, each including topic name,
            week number, score/total/percentage, pass/fail, and
            completion timestamp.

        """

        attempts = QuizAttempt.objects.filter(
            roadmap__user=request.user
        ).select_related(
            "topic",
            "roadmap"
        ).order_by("-completed_at")

        data = []

        for attempt in attempts:

            data.append({

                "attempt_id": attempt.id,
                "topic": attempt.topic.name,
                "week": attempt.roadmap.week,
                "score": attempt.score,
                "total": attempt.total_questions,
                "percentage": attempt.percentage,
                "passed": attempt.passed,
                "completed_at": attempt.completed_at,

            })

        return Response(data)
    


class ProfileView(APIView):

    """
    Returns the extended profile payload (basic user fields plus
    computed stats) via ProfileSerializer.
 
    NOTE: there is also a simpler ProfileView (GET + PUT, using a
    different ProfileSerializer with just id/username/email) defined
    in the accounts app views file seen earlier. If both are wired up
    under similar URL names, double-check which one "ProfileView"
    resolves to wherever it's imported/routed -- they return very
    different payloads and this one has no PUT method.

    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        """
        GET /roadmap/profile/
 
        Returns:
            200 with the serialized profile: name/username/email/
            date_joined plus roadmap/completed-week/quiz-passed/
            certificate counts (see ProfileSerializer for details).
            
        """

        serializer = ProfileSerializer(request.user)

        return Response(serializer.data)


class LatestCompletedRoadmapView(APIView):
    """
    Returns the most recently completed resource belonging to the
    authenticated user's learning roadmap.

    Authentication:
        - Requires a valid JWT access token.

    Workflow:
        1. Finds all ResourceProgress records whose roadmap belongs
           to the logged-in user.
        2. Excludes records that haven't been completed
           (completed_at IS NULL).
        3. Retrieves the most recently completed resource.
        4. Returns its roadmap and resource details.

    Responses:
        200 OK
            Returns the latest completed resource.

        404 NOT FOUND
            Returned when the user has not completed any resources.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        GET /latest-roadmap-time/

        Returns the latest completed resource for the authenticated
        user's roadmap.
        """

        try:

            # Find the latest completed resource for the current user.
            # roadmap__user traverses:
            #
            # ResourceProgress
            #        ↓
            # LearningRoadmap
            #        ↓
            # User

            progress = (
                ResourceProgress.objects
                .filter(
                    roadmap__user=request.user,
                    completed_at__isnull=False
                )
                .latest("completed_at")
            )


            print(progress.id)
            print(progress.completed_at)

            return Response(
                {
                    "roadmap_id": progress.roadmap.roadmap_id,
                    "week": progress.roadmap.week,
                    "topic": progress.roadmap.topic.name,
                    "resource": progress.resource.title,
                    "completed_at": progress.completed_at,
                },
                status=status.HTTP_200_OK,
            )

        except ResourceProgress.DoesNotExist:

            return Response(
                {
                    "message": "No completed resources found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )