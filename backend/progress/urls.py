from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    ProgressViewSet,
    CompleteWeekView,
    DashboardView,
    LearningStreakView
)

router = DefaultRouter()
router.register("progress", ProgressViewSet, basename="progress")

urlpatterns = [

    path(
        "complete/",
        CompleteWeekView.as_view()
    ),

    path(
        "dashboard/",
        DashboardView.as_view()
    ),

    path(
        "streak/",
        LearningStreakView.as_view()
    ),

    path("", include(router.urls)),
]