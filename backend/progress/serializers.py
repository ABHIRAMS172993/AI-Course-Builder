from rest_framework import serializers
from .models import Progress

class ProgressSerializer(serializers.ModelSerializer):

    """
     Serializes the Progress model for API input/output.

    Exposes every model field (fields = "__all__"), but "user" is
    read-only -- so it can be included in output, but the client
    can't set or change it directly via this serializer. The view
    is expected to assign `user` itself (typically from
    request.user) when creating a Progress instance.
    
    """
    
    class Meta:
        model = Progress
        fields = "__all__"
        read_only_fields = ["user"]