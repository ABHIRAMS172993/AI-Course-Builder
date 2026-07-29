from django.urls import path

from .views import (
    GenerateRoadmapView,
    MyRoadmapsView,
    CurrentRoadmapView,
    CompleteRoadmapWeekView,
    CompleteResourceView,
    GenerateCertificateView,
    RoadmapProgressView,
    GenerateQuizView,
    SubmitQuizView,
    QuizResultsView,
    ProfileView,
    RoadmapDetailView,
    DeleteRoadmapView,
    CertificateView,
    DownloadCertificateView,
    LatestCompletedRoadmapView
)

urlpatterns = [

    # Generate a new roadmap
    path(
        "generate/",
        GenerateRoadmapView.as_view(),
        name="generate-roadmap"
    ),

    # Get all user's roadmaps (optional/history)
    path(
        "my-roadmaps/",
        MyRoadmapsView.as_view(),
        name="my-roadmaps"
    ),

    path(
    "my-roadmaps/<int:roadmap_id>/",
    RoadmapDetailView.as_view()
    ),

    # Get only the latest roadmap
    path(
        "current/",
        CurrentRoadmapView.as_view(),
        name="current-roadmap"
    ),

    # Mark a week as completed
    path(
        "complete-week/",
        CompleteRoadmapWeekView.as_view(),
        name="complete-week"
    ),

    # Generate certificate
    path(
        "certificate/",
        GenerateCertificateView.as_view(),
        name="generate-certificate"
    ),

    path(
        "total-certificates/",
        CertificateView.as_view(),
        name="total-certificates"
    ),

    path(
    "complete-resource/",
    CompleteResourceView.as_view(),
    name="complete-resource"
),

path(
    "progress/",
    RoadmapProgressView.as_view(),
    name="roadmap-progress"
),

path(
    "quiz/generate/",
    GenerateQuizView.as_view(),
    name="generate-quiz",
),

path(
    "quiz/submit/",
    SubmitQuizView.as_view(),
    name="submit-quiz",
),

path(
    "quiz/results/",
    QuizResultsView.as_view(),
    name="quiz-results"
),

path("profile/", ProfileView.as_view(), name="profile"),

path(
    "my-roadmaps/<int:roadmap_id>/delete/",
    DeleteRoadmapView.as_view()
),

path(
    "certificate/download/<int:roadmap_id>/",
    DownloadCertificateView.as_view(),
    name="download-certificate"
),

path(
    "latest-roadmap-time/",
    LatestCompletedRoadmapView.as_view(),
    name = "latest-roadmap"
)

]