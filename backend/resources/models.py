from django.db import models


class Category(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True
    )

    description = models.TextField(
        blank=True
    )

    def __str__(self):
        return self.name


class Topic(models.Model):

    DIFFICULTY = (
        ("Beginner", "Beginner"),
        ("Intermediate", "Intermediate"),
        ("Advanced", "Advanced"),
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="topics"
    )

    name = models.CharField(max_length=100)

    description = models.TextField()

    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY
    )

    def __str__(self):
        return self.name


class Resource(models.Model):

    RESOURCE_TYPES = (
    ("Video", "Video"),
    ("Article", "Article"),
    ("Book", "Book"),
    ("Project", "Project"),
)

    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
        related_name="resources"
    )

    title = models.CharField(max_length=200)

    provider = models.CharField(max_length=100)

    resource_type = models.CharField(
        max_length=30,
        choices=RESOURCE_TYPES
    )

    url = models.URLField()

    duration = models.CharField(
        max_length=50,
        blank=True
    )

    is_free = models.BooleanField(default=True)

    rating = models.FloatField(default=5.0)

    def __str__(self):
        return self.title
    


class QuizQuestion(models.Model):
    topic = models.ForeignKey(
        "Topic",
        on_delete=models.CASCADE,
        related_name="quiz_questions"
    )

    question = models.TextField()

    option_a = models.CharField(max_length=255)
    option_b = models.CharField(max_length=255)
    option_c = models.CharField(max_length=255)
    option_d = models.CharField(max_length=255)

    CORRECT_CHOICES = [
        ("A", "A"),
        ("B", "B"),
        ("C", "C"),
        ("D", "D"),
    ]

    correct_answer = models.CharField(
        max_length=1,
        choices=CORRECT_CHOICES
    )

    explanation = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.topic.name} - {self.question[:50]}"