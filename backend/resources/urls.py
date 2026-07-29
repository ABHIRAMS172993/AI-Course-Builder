from django.urls import path
from .views import ResourceView,QuizQuestionView

urlpatterns = [
    path("", ResourceView.as_view(), name="resources"),
    path("quiz/",QuizQuestionView.as_view(),name="quiz-questions",),
]