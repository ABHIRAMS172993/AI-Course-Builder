import json

from google import genai
from django.conf import settings

from resources.models import Topic

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def generate_learning_roadmap(
    goal,
    skill_level,
    learning_style,
    weekly_hours,
    preferred_domains
):

    # Get all available topics from the database
    topics = Topic.objects.all().order_by(
        "category__name",
        "difficulty",
        "id"
    )

    topic_list = "\n".join(
        [
            f"- {topic.name} ({topic.category.name} | {topic.difficulty})"
            for topic in topics
        ]
    )

    prompt = f"""
You are an expert AI learning roadmap generator.

Create a personalized learning roadmap.

Career Goal:
{goal}

Current Skill Level:
{skill_level}

Preferred Learning Style:
{learning_style}

Weekly Study Hours:
{weekly_hours}

Preferred Domains:
{", ".join(preferred_domains)}

-------------------------------------------------------
IMPORTANT RULES
-------------------------------------------------------

1. ONLY use topics from the list below.

2. NEVER invent a new topic.

3. Every topic name must match EXACTLY.

4. Select topics appropriate for the user's:
   - Career Goal
   - Skill Level
   - Preferred Domains

5. Arrange the topics in the correct learning order.

6. Assign reasonable weekly study hours.

7. Return ONLY valid JSON.

-------------------------------------------------------
AVAILABLE TOPICS
-------------------------------------------------------

{topic_list}

-------------------------------------------------------
RETURN FORMAT
-------------------------------------------------------

[
    {{
        "week": 1,
        "topic": "HTML & CSS Fundamentals",
        "hours": 6
    }},
    {{
        "week": 2,
        "topic": "JavaScript Basics",
        "hours": 8
    }}
]

Return ONLY JSON.
Do not include markdown.
Do not include explanations.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
    )

    text = response.text.strip()

    # Remove markdown if Gemini returns it
    if text.startswith("```"):
        text = (
            text.replace("```json", "")
                .replace("```", "")
                .strip()
        )

    try:
        return json.loads(text)

    except json.JSONDecodeError:
        return {
            "error": "Gemini did not return valid JSON.",
            "raw_response": text
        }