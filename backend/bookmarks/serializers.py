from rest_framework import serializers
from .models import Bookmark

class BookmarkSerializer(serializers.ModelSerializer):

    title = serializers.CharField(source="course.title", read_only=True)
    category = serializers.CharField(source="course.category", read_only=True)
    level = serializers.CharField(source="course.level", read_only=True)
    instructor = serializers.CharField(source="course.instructor", read_only=True)
    course_url = serializers.URLField(source="course.course_url", read_only=True)

    class Meta:
        model = Bookmark
        fields = [
            "id",
            "course",
            "title",
            "category",
            "level",
            "instructor",
            "course_url",
            "created_at",
        ]