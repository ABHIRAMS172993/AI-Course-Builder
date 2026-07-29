from rest_framework import serializers
from .models import Category, Topic, Resource,QuizQuestion


class CategorySerializer(serializers.ModelSerializer):

    """
    Plain serializer for Category -- exposes every model field
    as-is, no customization.

    """
    class Meta:
        model = Category
        fields = "__all__"


class TopicSerializer(serializers.ModelSerializer):

    """ 
    Serializes a Topic, with its "category" field shown as a
    human-readable string (via StringRelatedField, i.e. whatever
    Category.__str__ returns) instead of the raw category ID.
 
    Note: since this uses StringRelatedField, "category" is
    effectively read-only here -- you can't create/update a Topic's
    category through this serializer using just a name string, you'd
    need the actual related object/ID.

    """

    category = serializers.StringRelatedField()

    class Meta:
        model = Topic
        fields = "__all__"


class ResourceSerializer(serializers.ModelSerializer):

    """ 
    Serializes a Resource, replacing the "topic" field with the
    related Topic's name (source="topic.name") instead of its ID.
 
    Like TopicSerializer.category above, this makes "topic"
    effectively read-only for writes -- the source path is only
    resolvable for output, not for interpreting incoming data, so
    creating/updating a Resource's topic via this field as-is isn't
    supported without a write-side override.

    """

    topic = serializers.CharField(source="topic.name")

    class Meta:
        model = Resource
        fields = "__all__"



class QuizQuestionSerializer(serializers.ModelSerializer):

    """ 
    Serializes a QuizQuestion for the frontend, deliberately
    EXCLUDING "correct_answer" so quiz-takers can't see the answer
    in the API response before submitting. Grading/answer-checking
    should happen elsewhere (server-side, comparing against the
    real model field), not via this serializer.
    
    """

    class Meta:
        model = QuizQuestion
        exclude = ["correct_answer"]