from courses.models import Course

def find_matching_courses(topic):

    keywords = topic.lower().split()

    matched_courses = []

    for course in Course.objects.all():

        title = course.title.lower()
        category = course.category.lower()


        if any(keyword in title or keyword in category for keyword in keywords):

            matched_courses.append({
                "id": course.id,
                "title":course.title,
                "category":course.category,
                "duration":course.duration,
                "instructor":course.instructor,
                "course_url":course.course_url
            })

    return matched_courses[:3]