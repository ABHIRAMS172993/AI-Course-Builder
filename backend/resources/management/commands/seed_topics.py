import json
from django.core.management.base import BaseCommand
from resources.models import Category, Topic

class Command(BaseCommand):

    """ 
    Django management command: `python manage.py <command_name>`
 
    Reads resources/seed_data/topics.json and imports its entries as
    Topic rows, creating each Topic's parent Category along the way
    if it doesn't already exist.
 
    Expected JSON shape -- a list of objects like:
        {
            "category": "Frontend",
            "name": "HTML & CSS Fundamentals",
            "difficulty": "Beginner",
            "description": "..."
        }
 
    Meant to run BEFORE the resources/quiz-seeding commands, since
    those look Topics up by name and will skip/warn if the topic
    doesn't exist yet.

    """
    help = "Seed topics"

    def handle(self, *args, **kwargs):

        """ 
        Entry point Django calls when the command runs.
 
        For each item in the JSON file:
            1. Get or create the Category by name.
            2. Get or create the Topic, matched on
               (category, name, difficulty) -- NOTE: difficulty is
               part of the lookup, not just a default. That means if
               a topic's difficulty changes between seed runs (same
               category+name but different difficulty), this will
               create a SECOND Topic row rather than updating the
               existing one's difficulty.
 
        Prints a success message once all items have been processed
        (always prints, regardless of whether any new rows were
        actually created).

        """

        with open("resources/seed_data/topics.json", encoding="utf-8") as f:
            topics = json.load(f)

        for item in topics:

            category, _ = Category.objects.get_or_create(
                name=item["category"]
            )

            # category + name + difficulty together form the lookup
            # here -- only "description" is a get_or_create default,
            # so it's only ever set when the row is first created,
            # never updated on subsequent runs.
            Topic.objects.get_or_create(
                category=category,
                name=item["name"],
                difficulty=item["difficulty"],
                defaults={
                    "description": item["description"]
                }
            )

        self.stdout.write(
            self.style.SUCCESS("Topics Added Successfully")
        )