from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import UserAchievement
from .serializers import UserAchievementSerializer


class AchievementView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        achievements = UserAchievement.objects.filter(
            user=request.user
        ).order_by("-earned_at")

        serializer = UserAchievementSerializer(
            achievements,
            many=True
        )

        return Response(serializer.data)