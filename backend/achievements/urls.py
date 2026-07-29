from django.urls import path

from .views import AchievementView

urlpatterns = [

    path(
        "",
        AchievementView.as_view()
    ),

]