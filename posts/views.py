from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import MedicinePost

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

        return JsonResponse({"message": "Post created successfully."}, status=201)

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