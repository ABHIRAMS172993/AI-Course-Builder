from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Bookmark
from .serializers import BookmarkSerializer

from courses.models import Course


class BookmarkView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        bookmarks = Bookmark.objects.filter(
            user=request.user
        )

        serializer = BookmarkSerializer(
            bookmarks,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        course_id = request.data.get("course")

        try:
            course = Course.objects.get(id=course_id)

        except Course.DoesNotExist:

            return Response(
                {"error": "Course not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        bookmark, created = Bookmark.objects.get_or_create(

            user=request.user,
            course=course

        )

        if not created:

            return Response(

                {"message": "Course already bookmarked"}

            )

        serializer = BookmarkSerializer(bookmark)

        return Response(

            serializer.data,

            status=status.HTTP_201_CREATED

        )


class DeleteBookmarkView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        try:

            bookmark = Bookmark.objects.get(

                id=pk,
                user=request.user

            )

        except Bookmark.DoesNotExist:

            return Response(

                {"error": "Bookmark not found"},

                status=status.HTTP_404_NOT_FOUND

            )

        bookmark.delete()

        return Response(

            {"message": "Bookmark removed successfully"}

        )