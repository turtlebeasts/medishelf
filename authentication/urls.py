from django.urls import path
from .views import index, register_user, get_user
urlpatterns = [
    path('', index),
    path('register', register_user),
    path('profile', get_user),
]