from rest_framework import serializers
from .models import Course,Review

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:

        model = Review

        fields = [

            "id",

            "course",

            "username",

            "rating",

            "comment",

            "created_at"

        ]

        read_only_fields = (

            "user",

            "created_at"

        )