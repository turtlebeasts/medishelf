from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.index, name="login"),
    path('register/', views.register_user),
    path('profile/<int:user_id>/', views.get_user, name="get_user"),
    path('logout/', views.logout_user),
    path('test/', views.test)
]
