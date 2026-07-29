from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import viewsets,status
from .models import Course,Review
from .serializers import CourseSerializer,ReviewSerializer


class CourseViewSet(viewsets.ModelViewSet):

    queryset = Course.objects.all()

    serializer_class = CourseSerializer

    permission_classes = [IsAuthenticated]


class RecommendedCourseView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        topic = request.GET.get("topic")

        if not topic:
            return Response({
                "error": "Topic parameter is required."
            }, status=400)

        keywords = topic.split()

        query = Q()

        for word in keywords:
            query |= Q(title__icontains=word)
            query |= Q(category__icontains=word)
            query |= Q(description__icontains=word)

        courses = Course.objects.filter(query).distinct()

        serializer = CourseSerializer(courses, many=True)

        return Response(serializer.data)
    

class SearchCourseView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        query = request.GET.get("q")

        if not query:

            return Response(
                {"error": "Search query is required"},
                status=400
            )

        courses = Course.objects.filter(

            Q(title__icontains=query) |

            Q(description__icontains=query) |

            Q(category__icontains=query) |

            Q(instructor__icontains=query)

        )

        serializer = CourseSerializer(
            courses,
            many=True
        )

        return Response(serializer.data)
    

class FilterCourseView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        category = request.GET.get("category")
        level = request.GET.get("level")
        duration = request.GET.get("duration")

        courses = Course.objects.all()

        if category:
            courses = courses.filter(
                category__iexact=category
            )

        if level:
            courses = courses.filter(
                level__iexact=level
            )

        if duration:
            courses = courses.filter(
                duration=duration
            )

        serializer = CourseSerializer(
            courses,
            many=True
        )

        return Response(serializer.data)
    

class ReviewView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        course_id = request.GET.get("course")

        if not course_id:

            return Response(
                {"error": "course parameter is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        reviews = Review.objects.filter(
            course_id=course_id
        ).order_by("-created_at")

        serializer = ReviewSerializer(
            reviews,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        serializer = ReviewSerializer(
            data=request.data
        )

        if serializer.is_valid():

            course = Course.objects.get(
                id=request.data["course"]
            )

            review, created = Review.objects.update_or_create(

                user=request.user,

                course=course,

                defaults={

                    "rating": serializer.validated_data["rating"],

                    "comment": serializer.validated_data["comment"]

                }

            )

            return Response(

                ReviewSerializer(review).data,

                status=status.HTTP_201_CREATED

            )

        return Response(

            serializer.errors,

            status=status.HTTP_400_BAD_REQUEST

        )


class DeleteReviewView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        try:

            review = Review.objects.get(

                id=pk,

                user=request.user

            )

        except Review.DoesNotExist:

            return Response(

                {"error": "Review not found"},

                status=status.HTTP_404_NOT_FOUND

            )

        review.delete()

        return Response({

            "message": "Review deleted successfully"

        })