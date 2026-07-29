from django.db.models import Max
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from roadmap.models import LearningRoadmap, ResourceProgress


class DashboardView(APIView):

    """ Returns summary statistics for the authenticated user's most
    recently created learning roadmap, for display on the dashboard.
 
    Stats returned:
        - total_weeks: number of weeks in the latest roadmap
        - completed_weeks: number of weeks marked completed
        - remaining_weeks: weeks left to complete
        - total_resources: total resources across all weeks
        - completed_resources: resources marked completed
        - progress_percentage: completed_weeks / total_weeks as a
          percentage, rounded to 2 decimal places
 
    If the user has no roadmap yet, all stats are returned as 0
    instead of raising an error."""

    permission_classes = [IsAuthenticated]

    def get(self, request):

        """         
        GET /dashboard/
 
        Looks up the user's latest roadmap (highest roadmap_id) and
        aggregates week/resource completion stats for it.
 
        Returns:
            Response: JSON object containing the stats described in
            the class docstring above. HTTP 200 in all cases (an
            empty/zeroed response is returned rather than a 404 when
            the user has no roadmap).
        """


        # Find the most recent roadmap_id belonging to this user.
        # roadmap_id is assumed to be an incrementing identifier, so
        # the max value corresponds to the latest roadmap generated.
        latest = LearningRoadmap.objects.filter(
            user=request.user
        ).aggregate(
            Max("roadmap_id")
        )

        latest_id = latest["roadmap_id__max"]


        # No roadmap exists yet for this user -> return zeroed stats
        # instead of erroring out, so the dashboard can render safely
        # for brand-new users.
        if latest_id is None:

            return Response({

                "total_weeks": 0,
                "completed_weeks": 0,
                "remaining_weeks": 0,
                "total_resources": 0,
                "completed_resources": 0,
                "progress_percentage": 0

            })
        
        # All week entries belonging to the user's latest roadmap.
        roadmap = LearningRoadmap.objects.filter(

            user=request.user,

            roadmap_id=latest_id

        )

        # All resource-progress entries tied to that same roadmap.
        resources = ResourceProgress.objects.filter(

            roadmap__roadmap_id=latest_id,

            roadmap__user=request.user

        )

        # --- Week-level stats ---
        total_weeks = roadmap.count()

        completed_weeks = roadmap.filter(
            completed=True
        ).count()

        remaining_weeks = total_weeks - completed_weeks


        # --- Resource-level stats ---
        total_resources = resources.count()

        completed_resources = resources.filter(
            completed=True
        ).count()

        # Overall progress is based on completed WEEKS (not
        # resources), guarded against division by zero when a
        # roadmap somehow has no weeks.
        progress_percentage = (
            round((completed_weeks / total_weeks) * 100, 2)
            if total_weeks > 0 else 0
        )

        return Response({

            "total_weeks": total_weeks,
            "completed_weeks": completed_weeks,
            "remaining_weeks": remaining_weeks,

            "total_resources": total_resources,
            "completed_resources": completed_resources,

            "progress_percentage": progress_percentage

        })