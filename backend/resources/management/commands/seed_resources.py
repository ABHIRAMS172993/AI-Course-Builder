import json

from django.core.management.base import BaseCommand

from resources.models import Topic, Resource


class Command(BaseCommand):

    """ 
    Django management command: `python manage.py <command_name>`
 
    Reads resources/seed_data/resources.json and imports its entries
    as Resource rows, linking each one to its Topic by name.
 
    Expected JSON shape -- a list of objects like:
        {
            "topic": "HTML & CSS Fundamentals",
            "title": "...",
            "provider": "...",
            "resource_type": "Video" | "Article" | "Book" | "Project",
            "url": "...",
            "duration": "...",
            "is_free": true/false,
            "rating": 4.9
        }
 
    Safe to re-run: uses get_or_create keyed on (topic, title), so
    re-running the command won't create duplicate resources -- it
    logs "Already Exists" and skips instead.

    """
    help = "Seed Resources"

    def handle(self, *args, **kwargs):

        """
        Entry point Django calls when the command runs.
 
        For each item in the JSON file:
            1. Look up the Topic by name; skip with an error message
               if no matching topic exists (unlike the quiz-seeding
               command, this uses .first() -- so if multiple Topics
               share the same name, only the first one found is used).
            2. Create the Resource if a matching (topic, title) pair
               doesn't already exist; log a warning if it does.
 
        Prints a final success message once all items have been
        processed (note: this always prints, even if every item was
        skipped due to missing topics or duplicates).

        """

        with open(
            "resources/seed_data/resources.json",
            encoding="utf-8"
        ) as f:
            resources = json.load(f)

        for item in resources:

            # .first() here (vs. the quiz command's .filter() loop)
            # means only ONE matching topic is used even if names
            # aren't unique in the DB.
            

            topic = Topic.objects.filter(
                name=item["topic"]
            ).first()

            if not topic:
                self.stdout.write(
                    self.style.ERROR(
                        f"Missing Topic -> {item}"
                    )
                )
                continue

            obj, created = Resource.objects.get_or_create(
                topic=topic,
                title=item["title"],
                defaults={
                    "provider": item["provider"],
                    "resource_type": item["resource_type"],
                    "url": item["url"],
                    "duration": item["duration"],
                    "is_free": item["is_free"],
                    "rating": item["rating"],
                }
            )

            if not created:
                self.stdout.write(
                    self.style.WARNING(
                        f"Already Exists -> {item['title']}"
                    )
                )

        self.stdout.write(
            self.style.SUCCESS("Resources Added Successfully")
        )