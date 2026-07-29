from django.db import models
from django.contrib.auth.models import User

from resources.models import Topic,Resource,QuizQuestion
from courses.models import Course

class LearningRoadmap(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="roadmaps"
    )

    roadmap_id = models.IntegerField()

    week = models.PositiveIntegerField()

    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
        related_name="roadmap_topics"
    )

    hours = models.PositiveIntegerField()

    career_goal = models.CharField(max_length=200,null=True)

    completed = models.BooleanField(default=False)

    completed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    class Meta:
        ordering = ["week"]

        unique_together = (
            "user",
            "roadmap_id",
            "week",
        )

    def __str__(self):
        return f"{self.user.username} Week {self.week}"
    


class ResourceProgress(models.Model):

    roadmap = models.ForeignKey(
        LearningRoadmap,
        on_delete=models.CASCADE,
        related_name="resource_progress"
    )

    resource = models.ForeignKey(
        Resource,
        on_delete=models.CASCADE
    )

    completed = models.BooleanField(default=False)

    completed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    class Meta:
        unique_together = (
            "roadmap",
            "resource",
        )

    def __str__(self):
        return self.resource.title


class Certificate(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    roadmap_id = models.IntegerField()

    course_name = models.ForeignKey(Course,on_delete=models.CASCADE,null=True,blank = True)

    certificate_number = models.CharField(
        max_length=100,
        unique=True
    )

    career_goal = models.CharField(max_length=255,null=True)

    issued_at = models.DateTimeField(
        auto_now_add=True
    )


    average_quiz_percentage = models.FloatField(default=0)

    class Meta:
        unique_together = ("user", "roadmap_id")

    def __str__(self):
        return self.certificate_number
    



class QuizAttempt(models.Model):

    roadmap = models.ForeignKey(
        LearningRoadmap,
        on_delete=models.CASCADE,
        related_name="quiz_attempts"
    )

    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE
    )

    started_at = models.DateTimeField(auto_now_add=True)

    completed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    score = models.IntegerField(default=0)

    total_questions = models.IntegerField(default=0)

    percentage = models.FloatField(default=0)

    passed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.roadmap.user.username} - {self.topic.name}"
    




class UserAnswer(models.Model):

    attempt = models.ForeignKey(
        QuizAttempt,
        on_delete=models.CASCADE,
        related_name="answers"
    )

    question = models.ForeignKey(
        QuizQuestion,
        on_delete=models.CASCADE
    )

    ANSWERS = [
        ("A", "A"),
        ("B", "B"),
        ("C", "C"),
        ("D", "D"),
    ]

    selected_answer = models.CharField(
        max_length=100,
        choices=ANSWERS
    )

    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.question.question[:40]



class SkillGap(models.Model):

    roadmap = models.ForeignKey(
        LearningRoadmap,
        on_delete=models.CASCADE,
        related_name="skill_gaps"
    )

    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE
    )

    weakness = models.TextField()

    recommendation = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)


class Roadmap(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="generated_roadmaps"
    )

    roadmap_id = models.IntegerField()

    career_goal = models.CharField(max_length=255)

    course = models.ForeignKey(
        Course,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "roadmap_id")


    def __str__(self):
        return f"{self.user.username} - {self.career_goal}"