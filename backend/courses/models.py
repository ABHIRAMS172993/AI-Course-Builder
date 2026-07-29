from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):

    title = models.CharField(max_length=200)

    description = models.TextField()

    category = models.CharField(max_length=100)

    level = models.CharField(max_length=50)

    duration = models.IntegerField()

    image = models.URLField(blank=True)

    course_url = models.URLField(blank=True)

    instructor = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Review(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="reviews"
    )

    rating = models.IntegerField()

    comment = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        unique_together = ("user", "course")

    def __str__(self):
        return f"{self.course.title} - {self.rating}"