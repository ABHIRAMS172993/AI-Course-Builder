from datetime import timedelta

from django.db.models import Avg
from django.utils import timezone

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Progress, LearningStreak
from .serializers import ProgressSerializer

from roadmap.models import LearningRoadmap
# from chatbot.models import QuizResult

from achievements.models import Achievement, UserAchievement


class ProgressViewSet(viewsets.ModelViewSet):

    """
    Standard CRUD API for a user's Progress records.
 
    Scoped so users can only ever see/modify their own Progress
    entries (get_queryset filters by request.user), and the "user"
    field is force-set server-side on creation (perform_create)
    rather than trusted from client input -- consistent with
    ProgressSerializer marking "user" as read_only.

    """

    serializer_class = ProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        """ 
        Restrict every list/retrieve/update/delete to the
        requesting user's own Progress records.

        """
        return Progress.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):

        """
        Attach the requesting user to a newly created Progress
        record, rather than trusting a "user" field from the
        request body.

        """
        serializer.save(
            user=self.request.user
        )


class CompleteWeekView(APIView):

    """ 
    Marks a specific week of a user's roadmap as completed, and
    updates their achievements + daily learning streak accordingly.

    """

    permission_classes = [IsAuthenticated]

    def post(self, request):

        """ 
        POST /complete-week/
 
        Body: { "roadmap_id": ..., "week": ... }
 
        Steps performed:
            1. Look up the matching LearningRoadmap week for this
               user and mark it completed (with a timestamp).
            2. If this is the user's first-ever completed week,
               award the "First Step" achievement (if it exists in
               the DB) via UserAchievement.get_or_create, so it's
               only ever granted once.
            3. Update the user's daily learning streak:
                 - first activity ever -> streak starts at 1
                 - already completed something today -> unchanged
                 - last activity was yesterday -> streak += 1
                 - otherwise (missed a day or more) -> streak resets to 1
               and updates longest_streak if the current streak is
               a new record.
 
        Returns:
            404 if no matching roadmap/week is found for this user.
            200 with a success message plus the updated current and
            longest streak values.

        """

        roadmap_id = request.data.get("roadmap_id")
        week = request.data.get("week")

        try:
            roadmap = LearningRoadmap.objects.get(
                user=request.user,
                roadmap_id=roadmap_id,
                week=week
            )

        except LearningRoadmap.DoesNotExist:
            return Response(
                {"error": "Roadmap week not found"},
                status=404
            )

        roadmap.completed = True
        roadmap.completed_at = timezone.now()
        roadmap.save()


        # Total completed weeks across ALL of the user's roadmaps
        # (not just this one) -- used below to check whether this
        # is their first-ever completion, for the "First Step" badge.

        completed = LearningRoadmap.objects.filter(
            user=request.user,
            completed=True
        ).count()

        print("Completed weeks:", completed)

        achievement = Achievement.objects.filter(
            name="First Step"
        ).first()

        print("Achievement:", achievement)

        # Award the "First Step" achievement once the user has
        # completed at least one week, if such an achievement is
        # configured. get_or_create prevents duplicate awards on
        # subsequent completions.


        if completed >= 1 and achievement:

            ua, created = UserAchievement.objects.get_or_create(
                user=request.user,
                achievement=achievement
            )

            print("Created:", created)
            print("UserAchievement:", ua)

        # --- Daily streak logic ---
        today = timezone.now().date()

        streak, created = LearningStreak.objects.get_or_create(
            user=request.user
        )

        if streak.last_activity is None:
            # First activity ever recorded for this user.
            streak.current_streak = 1

        elif streak.last_activity == today:
            # Already logged activity today -- streak unchanged,
            # avoids double-counting multiple completions in a day.
            pass

        elif streak.last_activity == today - timedelta(days=1):
            # Was active yesterday -> streak continues.
            streak.current_streak += 1

        else:
            # Gap of more than one day -> streak broken, restart at 1.
            streak.current_streak = 1

        if streak.current_streak > streak.longest_streak:
            streak.longest_streak = streak.current_streak

        streak.last_activity = today
        streak.save()

        return Response({
            "message": "Week completed successfully",
            "current_streak": streak.current_streak,
            "longest_streak": streak.longest_streak
        })

class DashboardView(APIView):

    """ 
    Aggregate dashboard stats across ALL of the user's roadmaps
    (unlike the roadmap-app's DashboardView, which only looks at the
    single latest one): week completion, quiz performance, and
    learning streak.
 
    NOTE: this view references `QuizResult`, but the import for it
    is commented out above (`# from chatbot.models import
    QuizResult`). As written, calling this endpoint will raise a
    NameError -- that import will need to be restored (or this
    section reworked) for it to run.

    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        """ GET /dashboard/
 
        Returns:
            200 with a JSON object containing:
                - total_roadmaps: count of distinct roadmap_ids
                - total_weeks / completed_weeks / remaining_weeks
                - completion_percentage: completed/total weeks, %
                - quizzes_attempted: count of QuizResult rows
                - average_quiz_score: mean of QuizResult.percentage
                  (0 if the user hasn't attempted any quizzes)
                - current_streak / longest_streak / last_activity
        """

        roadmaps = LearningRoadmap.objects.filter(
            user=request.user
        )

        total_weeks = roadmaps.count()

        completed_weeks = roadmaps.filter(
            completed=True
        ).count()

        remaining_weeks = total_weeks - completed_weeks

        completion_percentage = 0

        if total_weeks > 0:

            completion_percentage = round(
                (completed_weeks / total_weeks) * 100,
                2
            )

        quizzes = QuizResult.objects.filter(
            user=request.user
        )

        average_score = quizzes.aggregate(
            Avg("percentage")
        )["percentage__avg"] or 0

        streak, created = LearningStreak.objects.get_or_create(
            user=request.user
        )

        return Response({

            "total_roadmaps": roadmaps.values(
                "roadmap_id"
            ).distinct().count(),

            "total_weeks": total_weeks,

            "completed_weeks": completed_weeks,

            "remaining_weeks": remaining_weeks,

            "completion_percentage": completion_percentage,

            "quizzes_attempted": quizzes.count(),

            "average_quiz_score": average_score,

            "current_streak": streak.current_streak,

            "longest_streak": streak.longest_streak,

            "last_activity": streak.last_activity

        })


class LearningStreakView(APIView):

    """
    Lightweight, read-only endpoint for just the user's streak info
    (a subset of what DashboardView returns), useful when a
    frontend widget only needs streak data without pulling the full
    dashboard payload.

    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        """ 
        GET /streak/
 
        Returns the user's current streak, longest streak, and the
        date of their last recorded activity. Creates a
        LearningStreak row on first access if one doesn't exist yet
        (defaults: current_streak=0, longest_streak=0,
        last_activity=None, per the model's defaults).
        
        """

        streak, created = LearningStreak.objects.get_or_create(
            user=request.user
        )

        return Response({

            "current_streak": streak.current_streak,

            "longest_streak": streak.longest_streak,

            "last_activity": streak.last_activity

        })