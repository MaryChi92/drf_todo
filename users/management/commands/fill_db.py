import json

from django.core.management import BaseCommand
from django.conf import settings

from users.models import User


class Command(BaseCommand):

    @staticmethod
    def _load_data_from_file(file_name):
        with open(f'{settings.BASE_DIR}/users/json/{file_name}.json', encoding='utf-8') as json_file:
            return json.load(json_file)

    def handle(self, *args, **options):
        User.objects.all().delete()

        users_list = self._load_data_from_file('users')

        users_batch = []
        for user in users_list:
            users_batch.append(
                User(
                    username=user.get('username'),
                    first_name=user.get('first_name'),
                    last_name=user.get('last_name'),
                    email=user.get('email')
                )
            )

        User.objects.bulk_create(users_batch)

        super_user = User.objects.create_superuser(username='drf', email='drf@drf.local')
        super_user.set_password('drfdrf')
        super_user.save()
