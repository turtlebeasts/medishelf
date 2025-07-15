from django.urls import path
from .views import create_post, get_user_posts, delete_post

urlpatterns = [
    path('create/', create_post, name='create_post'),
    path('mine/', get_user_posts, name='get_user_posts'),
    path('delete/<int:post_id>/', delete_post, name='delete_user_post'),
]
