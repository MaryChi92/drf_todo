from django.db import models

from backend.users.models import User


class Project(models.Model):
    name = models.CharField(verbose_name='Название', max_length=64)
    repository = models.URLField(verbose_name='Ссылка на репозиторий', blank=True)
    users = models.ManyToManyField(User, verbose_name='Пользователи')

    def __str__(self):
        return f'{self.name}'


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.PROTECT)
    text = models.TextField(verbose_name='Текст')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создана')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлена')
    created_by_user = models.ForeignKey(User, verbose_name='Создана (юзер)', on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True, verbose_name='Активна')

