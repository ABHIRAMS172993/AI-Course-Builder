import json
import os

from django.core.management.base import BaseCommand

from resources.models import Topic, QuizQuestion


class Command(BaseCommand):

    """ 
    Django management command: `python manage.py <command_name>`
 
    Reads resources/seed_data/quiz_data.json and imports its entries
    as QuizQuestion rows, linking each question to its Topic by name.
 
    Expected JSON shape -- a list of objects like:
        {
            "topic": "HTML & CSS Fundamentals",
            "question": "...",
            "option1": "...", "option2": "...",
            "option3": "...", "option4": "...",
            "correct_answer": "<must exactly match one of the options>",
            "explanation": "..."   # optional
        }
 
    Safe to re-run: uses get_or_create keyed on (topic, question), so
    re-running the command won't create duplicate questions -- it
    will just skip ones that already exist.

    """
    help = "Seed quiz questions into the database"

    def handle(self, *args, **kwargs):

        """ 
        Entry point Django calls when the command runs.
 
        For each item in the JSON file:
            1. Look up the Topic(s) by name; skip with a warning if
               no matching topic exists.
            2. Figure out which option (A/B/C/D) matches
               "correct_answer" by exact string comparison; skip
               with a warning if none of the four options match.
            3. Create the QuizQuestion if it doesn't already exist
               for that topic+question combination.
 
        Prints a summary count of how many questions were newly
        created once finished.

        """

        file_path = os.path.join(
            "resources",
            "seed_data",
            "quiz_data.json"
        )

        with open(file_path, encoding="utf-8") as f:
            data = json.load(f)

        created_count = 0

        for item in data:


            # NOTE: filter() rather than get() -- if multiple Topic
            # rows share the same name, the question gets linked to
            # ALL of them (see the "for topic in topics" loop below),
            # not just one.

            topics = Topic.objects.filter(
                name=item["topic"]
            )

            if not topics.exists():
                self.stdout.write(
                    self.style.WARNING(
                        f"Topic '{item['topic']}' not found."
                    )
                )
                continue

            # Convert answer text to A/B/C/D
            # Matches "correct_answer" against each option's exact
            # text to determine the stored letter code. This means
            # the JSON's correct_answer string must match one of the
            # four options character-for-character (including
            # punctuation/casing) or it'll be rejected below.
            if item["correct_answer"] == item["option1"]:
                correct = "A"
            elif item["correct_answer"] == item["option2"]:
                correct = "B"
            elif item["correct_answer"] == item["option3"]:
                correct = "C"
            elif item["correct_answer"] == item["option4"]:
                correct = "D"
            else:
                self.stdout.write(
                    self.style.WARNING(
                        f"Invalid correct answer for: {item['question']}"
                    )
                )
                continue


            # If more than one Topic matched the name above, the
            # same question gets seeded once per matching topic
            for topic in topics:

                _, created = QuizQuestion.objects.get_or_create(
                    topic=topic,
                    question=item["question"],
                    defaults={
                        "option_a": item["option1"],
                        "option_b": item["option2"],
                        "option_c": item["option3"],
                        "option_d": item["option4"],
                        "correct_answer": correct,
                        "explanation": item.get("explanation", "")
                    }
                )

                if created:
                    created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"{created_count} quiz questions imported successfully."
            )
        )