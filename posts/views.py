from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import MedicinePost
from django.db.models import Q

@csrf_exempt
@login_required
def create_post(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        expiry_date = request.POST.get('expiry_date')
        description = request.POST.get('description')
        image = request.FILES.get('image')

        if not all([title, expiry_date, description, image]):
            return JsonResponse({"error": "All fields are required."}, status=400)

        post = MedicinePost.objects.create(
            user=request.user,
            title=title,
            expiry_date=expiry_date,
            description=description,
            image=image,
        )

        post_data = {
            "id": post.id,
            "title": post.title,
            "expiry_date": str(post.expiry_date),
            "description": post.description,
            "image": request.build_absolute_uri(post.image.url),
            "created_at": str(post.created_at),
            "user_id": post.user.id,
        }

        return JsonResponse({"message": "Post created successfully.", "data":post_data}, status=201)

    return JsonResponse({"error": "Invalid request method."}, status=405)


@login_required
def get_user_posts(request):
    posts = MedicinePost.objects.filter(user=request.user).order_by('-created_at')

    posts_data = [
        {
            "id": post.id,
            "title": post.title,
            "description": post.description,
            "expiry_date": post.expiry_date,
            "image": request.build_absolute_uri(post.image.url),
            "created_at": post.created_at,
            "user":post.user.id
        }
        for post in posts
    ]

    return JsonResponse(posts_data, safe=False)

@csrf_exempt
@login_required
def delete_post(request, post_id):
    if request.method == "DELETE":
        try:
            post = MedicinePost.objects.get(id=post_id, user=request.user)
            post.delete()
            return JsonResponse({"message": "Post deleted successfully."}, status=200)
        except MedicinePost.DoesNotExist:
            return JsonResponse({"error": "Post not found or unauthorized."}, status=404)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
    

@login_required
def get_all_posts(request):
    posts = MedicinePost.objects.all().order_by('-created_at')

    posts_data = [
        {
            "id": post.id,
            "title": post.title,
            "description": post.description,
            "expiry_date": post.expiry_date,
            "image": request.build_absolute_uri(post.image.url),
            "created_at": post.created_at,
            "user": post.user.id,
            "username": post.user.username
        }
        for post in posts
    ]

    return JsonResponse(posts_data, safe=False)


def search_medicines(request):
    query = request.GET.get('q', '').strip()

    if not query:
        return JsonResponse([], safe=False)

    # Case-insensitive search on title or description
    medicines = MedicinePost.objects.filter(
        Q(title__icontains=query) | Q(description__icontains=query)
    ).values('id', 'title')  # Only send necessary fields

    # Rename `title` to `name` to match frontend's expected structure
    results = [{"id": m["id"], "name": m["title"]} for m in medicines]

    return JsonResponse(results, safe=False)