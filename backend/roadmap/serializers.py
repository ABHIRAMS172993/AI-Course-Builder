from rest_framework import serializers

from .models import (
    LearningRoadmap,
    ResourceProgress,
    Certificate,
    QuizAttempt,
    UserAnswer,
    SkillGap
)

from resources.models import Resource
from resources.serializers import ResourceSerializer


from django.contrib.auth.models import User


class ResourceProgressSerializer(serializers.ModelSerializer):

    """ 
    Represents a single resource within a roadmap week, plus whether
    the user has completed it. The related Resource is nested and
    fully serialized (read-only) rather than shown as just an ID.

    """

    resource = ResourceSerializer(read_only=True)

    class Meta:
        model = ResourceProgress
        fields = [
            "id",
            "resource",
            "completed",
            "completed_at",
        ]


class LearningRoadmapSerializer(serializers.ModelSerializer):

    """ 
    Represents a single week of a user's learning roadmap, including
    the topic name and the list of resources for that week (each
    with its own completion status).

    """

    topic_name = serializers.CharField(
        source="topic.name",
        read_only=True
    )

    resources = serializers.SerializerMethodField()

    class Meta:
        model = LearningRoadmap
        fields = [
            "id",
            "roadmap_id",
            "week",
            "topic_name",
            "hours",
            "completed",
            "resources",
        ]

    def get_resources(self, obj):

        """ 
        Builds the "resources" field manually rather than declaring
        it as a nested ResourceProgressSerializer(many=True).
 
        Functionally this produces the same shape as
        ResourceProgressSerializer would (id, completed, resource),
        just assembled by hand here instead of reusing that
        serializer -- worth consolidating into one source of truth
        if the two ever need to change in sync.
 
        select_related("resource") avoids an extra DB query per
        resource when serializing.

        """

        progress = ResourceProgress.objects.filter(
            roadmap=obj
        ).select_related("resource")

        return [
            {
                "id": p.id,
                "completed": p.completed,
                "resource": ResourceSerializer(p.resource).data,
            }
            for p in progress
        ]

    

class GenerateRoadmapSerializer(serializers.Serializer):

    """ 
    Input validation for the "generate a new roadmap" endpoint.
    Not tied to a model -- just validates the parameters used to
    build a roadmap (presumably fed into an AI/roadmap-generation
    service elsewhere).

    """

    goal = serializers.CharField()

    skill_level = serializers.CharField()

    learning_style = serializers.CharField()

    weekly_study_hours = serializers.IntegerField()

    preferred_domains = serializers.ListField(
        child=serializers.CharField()
    )


class CompleteWeekSerializer(serializers.Serializer):

    """ Input validation for marking a specific roadmap week complete. """

    roadmap_id = serializers.IntegerField()

    week = serializers.IntegerField()




class CompleteResourceSerializer(serializers.Serializer):

    """ 
    Input validation for marking a single resource (by its
    ResourceProgress id) complete.
    """

    resource_progress_id = serializers.IntegerField()


class CertificateSerializer(serializers.ModelSerializer):

    """Plain serializer exposing all Certificate fields as-is."""

    class Meta:
        model = Certificate
        fields = "__all__"


class QuizAttemptSerializer(serializers.ModelSerializer):

    """Plain serializer exposing all QuizAttempt fields as-is."""

    class Meta:
        model = QuizAttempt
        fields = "__all__"


class UserAnswerSerializer(serializers.ModelSerializer):

    """Plain serializer exposing all UserAnswer fields as-is."""

    class Meta:
        model = UserAnswer
        fields = "__all__"


class SkillGapSerializer(serializers.ModelSerializer):

    """Plain serializer exposing all SkillGap fields as-is."""
 

    class Meta:
        model = SkillGap
        fields = "__all__"



class ProfileSerializer(serializers.ModelSerializer):

    """ 
    Extended user profile: basic Django User fields plus computed
    learning stats (roadmap count, completed weeks, quizzes passed,
    certificates earned), used for a "my profile" page.
 
    NOTE on naming: "completed_courses" actually counts completed
    *roadmap weeks* (LearningRoadmap rows with completed=True), not
    distinct completed courses/roadmaps. If a "how many full
    roadmaps has this user finished" stat is needed separately,
    that would require counting distinct roadmap_ids where every
    week is completed -- this field doesn't do that.
    
    """

    roadmaps = serializers.SerializerMethodField()
    completed_courses = serializers.SerializerMethodField()
    quiz_passed = serializers.SerializerMethodField()
    certificates = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "date_joined",
            "roadmaps",
            "completed_courses",
            "quiz_passed",
            "certificates",
        ]

    def get_roadmaps(self, obj):

        """ 
        Total number of LearningRoadmap rows (i.e. weeks across
        all roadmaps) belonging to this user.
 
        NOTE: local import here (and in the three methods below) is
        redundant -- LearningRoadmap/QuizAttempt/Certificate are
        already imported at the top of this file. Not a bug, just
        unnecessary duplication.

        """
        from .models import LearningRoadmap
        return LearningRoadmap.objects.filter(user=obj).count()

    def get_completed_courses(self, obj):

        """ 
        Number of completed LearningRoadmap weeks for this user
        (see NOTE on the class docstring re: naming).

        """
        from .models import LearningRoadmap
        return LearningRoadmap.objects.filter(
            user=obj,
            completed=True
        ).count()

    def get_quiz_passed(self, obj):

        """ Number of QuizAttempts this user has passed, across all
        of their roadmaps.
        """
        from .models import QuizAttempt
        return QuizAttempt.objects.filter(
            roadmap__user=obj,
            passed=True
        ).count()

    def get_certificates(self, obj):
        """Number of certificates this user has earned."""
        from .models import Certificate
        return Certificate.objects.filter(
            user=obj
        ).count()