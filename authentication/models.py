from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class CustomUser(AbstractUser):
    # Add custom fields here if needed later (like phone, is_verified etc.)
    pass
