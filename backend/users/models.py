from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(verbose_name='E-mail', unique=True)

    def __str__(self):
        return f'{self.username}'