from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Resource, QuizQuestion
from .serializers import (
    ResourceSerializer,
    QuizQuestionSerializer,
)


class ResourceView(APIView):

    """ 
    Lets an authenticated user browse/filter the Resource catalog.
 
    Provides two ways to filter, aimed at different use cases:
      - GET:  simple single-value filters via query params, e.g. for
              a basic "browse resources" page.
      - POST: same idea but accepts a LIST of topics in the request
              body (topics=[...]), matched with OR logic, for cases
              where filtering by multiple topics at once doesn't fit
              cleanly into query-string params. Despite using POST,
              this doesn't create/modify anything -- it's read-only,
              just like GET.

              
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        """
        GET /resources/?category=...&topic=...&difficulty=...&type=...
 
        All filters are optional and combine with AND logic. Text
        filters are case-insensitive:
            - category: exact match on the topic's category name
            - topic: partial match on topic name (icontains)
            - difficulty: exact match on the topic's difficulty
            - type: exact match on resource_type (Video/Article/etc.)
 
        Returns:
            200 with a (possibly empty) list of matching resources.

        """

        resources = Resource.objects.all()

        category = request.GET.get("category")
        topic = request.GET.get("topic")
        difficulty = request.GET.get("difficulty")
        resource_type = request.GET.get("type")

        if category:
            resources = resources.filter(
                topic__category__name__iexact=category
            )

        if topic:
            resources = resources.filter(
                topic__name__icontains=topic
            )

        if difficulty:
            resources = resources.filter(
                topic__difficulty__iexact=difficulty
            )

        if resource_type:
            resources = resources.filter(
                resource_type__iexact=resource_type
            )

        serializer = ResourceSerializer(
            resources,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        """ 
        POST /resources/
 
        Body (all optional):
            {
                "category": "...",
                "difficulty": "...",
                "topics": ["Topic A", "Topic B", ...]
            }
 
        Same filtering idea as GET, except "topics" accepts a LIST
        of topic names, matched with OR logic (a resource matches if
        its topic name equals ANY of the supplied names -- exact
        match, case-insensitive). category/difficulty still combine
        with AND against the topics filter.
 
        This is a read-only "search" endpoint despite being a POST --
        POST is used here purely so a list of topics can be sent in
        the request body, rather than to create/modify anything.
 
        Returns:
            200 with a (possibly empty) list of matching resources.

        """

        category = request.data.get("category")
        difficulty = request.data.get("difficulty")
        topics = request.data.get("topics", [])

        resources = Resource.objects.all()

        if category:
            resources = resources.filter(
                topic__category__name__iexact=category
            )

        if difficulty:
            resources = resources.filter(
                topic__difficulty__iexact=difficulty
            )

        if topics:

            # Build "topic__name__iexact = A OR topic__name__iexact
            # = B OR ..." dynamically for however many topics were
            # supplied, since Django's filter() can't OR multiple
            # values together directly.

            query = Q()

            for topic in topics:
                query |= Q(topic__name__iexact=topic)

            resources = resources.filter(query)

        serializer = ResourceSerializer(
            resources,
            many=True
        )

        return Response(serializer.data)


class QuizQuestionView(APIView):

    """
    Fetches quiz questions for a given topic, with the correct
    answer stripped out by QuizQuestionSerializer so it isn't
    exposed to the quiz-taker before they submit.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        """ 
        GET /quiz-questions/?topic=...
 
        "topic" is required (exact match, case-insensitive).
 
        Returns:
            400 if "topic" isn't supplied.
            200 with the list of matching questions (possibly empty
            if no questions exist for that topic).
            
        """

        topic = request.GET.get("topic")

        if not topic:
            return Response(
                {
                    "error": "topic is required"
                },
                status=400
            )

        questions = QuizQuestion.objects.filter(
            topic__name__iexact=topic
        )

        serializer = QuizQuestionSerializer(
            questions,
            many=True
        )

        return Response(serializer.data)