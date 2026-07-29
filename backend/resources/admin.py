from django.contrib import admin
from .models import Category, Topic, Resource,QuizQuestion

admin.site.register(Category)
admin.site.register(Topic)
admin.site.register(Resource)

@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ("question", "topic", "correct_answer")
    list_filter = ("topic",)
    search_fields = ("question",)