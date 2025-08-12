from django.urls import path
from .views import create_post, get_user_posts, delete_post, get_all_posts, search_medicines

urlpatterns = [
    path('all/', get_all_posts, name='get_all_posts'),
    path('create/', create_post, name='create_post'),
    path('mine/', get_user_posts, name='get_user_posts'),
    path('delete/<int:post_id>/', delete_post, name='delete_user_post'),
    path("search", search_medicines, name="search_medicines"),
]
