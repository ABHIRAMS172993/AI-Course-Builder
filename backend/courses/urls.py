from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    CourseViewSet,
    RecommendedCourseView,
    SearchCourseView,
    FilterCourseView,
    ReviewView,
    DeleteReviewView,
)

router = DefaultRouter()
router.register("", CourseViewSet, basename="course")

urlpatterns = [

    path(
        "recommend/",
        RecommendedCourseView.as_view()
    ),

    path(
        "search/",
        SearchCourseView.as_view()
    ),

    path(
        "filter/",
        FilterCourseView.as_view()
    ),

    path(
        "reviews/",
        ReviewView.as_view()
    ),

    path(
        "reviews/<int:pk>/",
        DeleteReviewView.as_view()
    ),

    path("", include(router.urls)),
]