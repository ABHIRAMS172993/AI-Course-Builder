from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (

    RegisterSerializer,

    ProfileSerializer,

    ChangePasswordSerializer

)

from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings


class RegisterView(APIView):


    """
    Sign-up endpoint. Creates a new User account from a username,
    email, and password via RegisterSerializer (which handles
    password hashing).
 
    No permission_classes set -> open to unauthenticated requests,
    as expected for a registration endpoint.

    """

    def post(self, request):

        """
        POST /register/
 
        Body: { "username": ..., "email": ..., "password": ... }
 
        Returns:
            201 with a success message if the account was created.
            200 with serializer validation errors otherwise (note:
            error responses don't currently set an explicit failing
            status code, so they default to 200 -- see inline note
            below).

        """

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(

                {"message": "User Registered"},

                status=status.HTTP_201_CREATED

            )


        # NOTE: no status= here, so this currently returns HTTP 200
        # even though registration failed. Consider adding
        # status=status.HTTP_400_BAD_REQUEST if that's not intentional.

        return Response(serializer.errors)


class LoginView(APIView):


    """
    Username/password login endpoint. On success, issues a JWT
    access/refresh token pair (via SimpleJWT) that the client uses
    to authenticate subsequent requests.

    """

    def post(self, request):


        """
        POST /login/
 
        Body: { "username": ..., "password": ... }
 
        Returns:
            200 with {"refresh": ..., "access": ...} on success.
            401 with an error message if credentials are invalid.

        """

        username = request.data.get("username")
        password = request.data.get("password")


        # Verifies the username/password against Django's auth
        # backend. Returns the User on success, or None if invalid

        user = authenticate(

            username=username,

            password=password

        )

        if user:

            refresh = RefreshToken.for_user(user)

            return Response({

                "refresh": str(refresh),

                "access": str(refresh.access_token)

            })

        return Response(

            {"error": "Invalid Credentials"},

            status=401

        )


class ProfileView(APIView):

    """
    Lets the logged-in user view and update their own profile
    (username/email only, per ProfileSerializer).

    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        """
        GET /profile/ -> returns the current user's profile data.

        """

        serializer = ProfileSerializer(request.user)

        return Response(serializer.data)

    def put(self, request):

        """
        PUT /profile/ -> partially updates the current user's
        profile (partial=True, so only fields supplied in the
        request body are changed).
 
        Returns:
            200 with the updated profile data on success.
            400 with validation errors otherwise.

        """

        serializer = ProfileSerializer(

            request.user,

            data=request.data,

            partial=True

        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(

            serializer.errors,

            status=400

        )


class ChangePasswordView(APIView):

    """ 
    Lets the logged-in user change their password, provided they
    can correctly supply their current ("old") password. 

    """
    permission_classes = [IsAuthenticated]

    def put(self, request):

        """ 
        PUT /change-password/
 
        Body: { "old_password": ..., "new_password": ... }
 
        Returns:
            200 with a success message if the old password checks
            out and the new one is set.
            400 if the old password is wrong, or if the serializer
            fails validation (e.g. missing fields).

        """

        serializer = ChangePasswordSerializer(

            data=request.data

        )

        if serializer.is_valid():

            old_password = serializer.validated_data["old_password"]

            new_password = serializer.validated_data["new_password"]

            # Confirm the user actually knows their current password
            # before allowing it to be changed.

            if not request.user.check_password(old_password):

                return Response(

                    {"error": "Old password is incorrect"},

                    status=400

                )

            # set_password() hashes the new password before storing it.
            request.user.set_password(new_password)

            request.user.save()

            return Response({

                "message": "Password changed successfully"

            })

        return Response(

            serializer.errors,

            status=400

        )
    



class GoogleLoginView(APIView):



    """
     "Sign in with Google" endpoint. Verifies a Google ID token
    (credential) sent from the frontend's Google Sign-In widget,
    then logs the user in -- creating a local User account on their
    first login if one doesn't already exist -- and issues JWTs the
    same way LoginView does.
 
    No permission_classes set -> open to unauthenticated requests,
    since this *is* the login step.

    """

    def post(self, request):

        """
        POST /google-login/
 
        Body: { "credential": "<Google ID token>" }
 
        Verifies the token with Google, extracts the user's email
        and name, and either fetches or creates a matching local
        User (username = email). Existing users are matched by
        username, so a user who previously registered with the same
        email/username via RegisterView will log into that same
        account rather than getting a duplicate.
 
        Returns:
            200 with {"access": ..., "refresh": ...} on success.
            400 if no credential was supplied, or if Google token
            verification fails for any reason (expired, tampered,
            wrong client ID, etc).

        """


        credential = request.data.get("credential")

        print("Request Data:", request.data)
        print("Credential:", credential)

        if not credential:
            return Response(
                {"error": "Credential is required"},
                status=400
            )

        try:

            # Verifies the token's signature, expiry, and audience
            # (GOOGLE_CLIENT_ID) against Google's servers. Raises an
            # exception if the token is invalid for any reason.
            # clock_skew_in_seconds allows a small tolerance for
            # clock drift between this server and Google's.

            info = id_token.verify_oauth2_token(
                credential,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID,
                clock_skew_in_seconds=30
            )

            email = info["email"]

            first_name = info.get("given_name", "")
            last_name = info.get("family_name", "")

            # Reuse an existing account (matched by username=email),
            # or create a new one on first-ever Google login.

            user, created = User.objects.get_or_create(
                username=email,
                defaults={
                    "email": email,
                    "first_name": first_name,
                    "last_name": last_name,
                }
            )

            refresh = RefreshToken.for_user(user)

            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "first_name": user.first_name,
                "last_name": user.last_name,
                "username": user.username,
                "email": user.email,
            })

        except Exception as e:

            # Covers invalid/expired/tampered tokens, wrong client
            # ID, and network errors talking to Google.
            
            print("Google Login Error:", repr(e))
            return Response(
                {"error": str(e)},
                status=400
    )