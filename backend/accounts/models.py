from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    current_level = models.CharField(
    max_length=30,
    default="Beginner"
)

    goal = models.CharField(
        max_length=200,
        default=""
    )

    available_hours = models.IntegerField(
        default=1
    )

    preferred_language = models.CharField(
        max_length=50,
        default="English"
    )

    interests = models.TextField(
        default=""
    )

    # Profile Information
    bio = models.TextField(
        blank=True
    )

    profile_picture = models.URLField(
        blank=True
    )

    skills = models.CharField(
        max_length=255,
        blank=True
    )

    github = models.URLField(
        blank=True
    )

    linkedin = models.URLField(
        blank=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.user.username