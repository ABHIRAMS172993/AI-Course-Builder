from django.contrib.auth.models import User
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):

    """
    Handles new user sign-up.
 
    Accepts a username, email, and plaintext password, and creates a
    new Django User with the password properly hashed (via
    User.objects.create_user, rather than saving it raw).
 
    `password` is write_only so it's accepted on input but never
    included when a User instance is serialized back out (e.g. in
    API responses).

    """

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):

        """ Creates the User using Django's create_user() helper, which
        takes care of hashing the password. Using this instead of
        User.objects.create() is important -- otherwise the password
        would be stored in plaintext.
        """

        user = User.objects.create_user(
            username=validated_data["username"].title(),
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user
    

class ProfileSerializer(serializers.ModelSerializer):

    """

    Read-only(ish) representation of a user's basic profile info,
    used for endpoints like "get current user" / "view profile".
 
    Exposes only non-sensitive fields (id, username, email) -- no
    password or other account internals.

    """

    class Meta:

        model = User

        fields = [

            "id",

            "username",

            "email"

        ]


class ChangePasswordSerializer(serializers.Serializer):

    """
    Input validation for a "change password" endpoint.
 
    Not a ModelSerializer since it doesn't map directly to a model
    instance -- it just validates the two incoming fields. The view
    handling this serializer is responsible for:
      1. checking old_password against the user's current password
      2. setting new_password (hashed) if that check passes
      
    """

    old_password = serializers.CharField()

    new_password = serializers.CharField()