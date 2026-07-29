from django.db import models
from django.contrib.auth.models import User


class Achievement(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True
    )

    description = models.TextField()

    icon = models.CharField(
        max_length=50
    )

    def __str__(self):
        return self.name


class UserAchievement(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    achievement = models.ForeignKey(
        Achievement,
        on_delete=models.CASCADE
    )

    earned_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        unique_together = (
            "user",
            "achievement"
        )

    def __str__(self):
        return f"{self.user.username} - {self.achievement.name}"