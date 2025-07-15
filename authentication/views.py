from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login as django_login
from django.contrib.auth.decorators import login_required

import json


User = get_user_model()

@csrf_exempt
def index(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            if not username or not password:
                return JsonResponse({"error": "Username and password are required."}, status=400)

            user = authenticate(username=username, password=password)

            if user is not None:
                django_login(request, user)  # logs in the user (if using sessions)
                return JsonResponse({"message": "Login successful."}, status=200)
            else:
                return JsonResponse({"error": "Invalid credentials."}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)

    return JsonResponse({"error": "Only POST method allowed."}, status=405)

@csrf_exempt
def register_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            username = data.get("username")
            email = data.get("email")
            password = data.get("password")
            confirm_password = data.get("confirm_password")

            # Basic validations
            if not all([username, email, password, confirm_password]):
                return JsonResponse({"error": "All fields are required."}, status=400)

            if password != confirm_password:
                return JsonResponse({"error": "Passwords do not match."}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists."}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({"error": "Email already registered."}, status=400)

            # Create the user
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()

            return JsonResponse({"message": "User registered successfully."}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data."}, status=400)

    return JsonResponse({"error": "Only POST method allowed."}, status=405)


@login_required
def get_user(request):
    user = request.user
    return JsonResponse({
        "username": user.username,
        "email": user.email,
    })