from django.contrib.auth import authenticate, login as django_login, logout as django_logout, get_user_model
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
import json

User = get_user_model()

@ensure_csrf_cookie
def csrf_token(request):
    """Send a CSRF token cookie to the client."""
    return JsonResponse({"message": "CSRF cookie set"})

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
                django_login(request, user)  # session login
                return JsonResponse({
                    "message": "Login successful.",
                    "user_id": user.id
                }, status=200)
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

            if not all([username, email, password, confirm_password]):
                return JsonResponse({"error": "All fields are required."}, status=400)

            if password != confirm_password:
                return JsonResponse({"error": "Passwords do not match."}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists."}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({"error": "Email already registered."}, status=400)

            User.objects.create_user(username=username, email=email, password=password)

            return JsonResponse({"message": "User registered successfully."}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data."}, status=400)

    return JsonResponse({"error": "Only POST method allowed."}, status=405)

@login_required
def get_user(request, user_id):
    if request.method == "GET":
        try:
            user = User.objects.get(pk=user_id)
            return JsonResponse({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "date_joined": user.date_joined.isoformat(),
            })
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)

    return JsonResponse({"error": "Only GET method allowed."}, status=405)

@login_required
def logout_user(request):
    if request.method == "POST":
        django_logout(request)
        return JsonResponse({"message": "Logged out successfully."})
    return JsonResponse({"error": "Only POST method allowed."}, status=405)

@csrf_exempt
def test(request):
    return JsonResponse({"data": "Hello"})
