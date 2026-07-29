from django.urls import path

from .views import (

    BookmarkView,

    DeleteBookmarkView

)

urlpatterns = [

    path(
        "",
        BookmarkView.as_view()
    ),

    path(
        "<int:pk>/",
        DeleteBookmarkView.as_view()
    ),

]