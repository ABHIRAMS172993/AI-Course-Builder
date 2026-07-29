from django.db import models
from django.contrib.auth.models import User
from roadmap.models import LearningRoadmap


class Progress(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    roadmap = models.ForeignKey(
        LearningRoadmap,
        on_delete=models.CASCADE
    )

    week = models.IntegerField()

    topic = models.CharField(max_length=255)

    completed = models.BooleanField(default=False)

    completed_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "roadmap", "week")



class LearningStreak(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    current_streak = models.IntegerField(
        default=0
    )

    longest_streak = models.IntegerField(
        default=0
    )

    last_activity = models.DateField(
        null=True,
        blank=True
    )
