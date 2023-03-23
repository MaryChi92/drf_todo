from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer

from .models import Project, ToDo
from .views import ProjectModelViewSet
from users.models import User


class TestProjectViewSet(TestCase):

    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.api_projects = '/api/projects/'
        self.api_todos = '/api/todos/'
        self.admin = User.objects.create_superuser('drf', 'drf@drf.local', 'drfdrf')
        self.data_project = {'name': 'test project', 'users': [1]}
        self.data_project_edit = {'name': 'test project 1', 'users': [1]}
        self.data_todo = {'project': 'test project', 'text': 'test to-do', 'created_by_user': 1}

    def test_get_list(self):
        request = self.factory.get(self.api_projects)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        request = self.factory.post(self.api_projects, self.data_project, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project_admin(self):
        request = self.factory.post(self.api_projects, self.data_project, format='json')
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.get(f'{self.api_projects}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestTodoViewSet(APITestCase):

    def setUp(self) -> None:
        self.api_todos = '/api/todos/'
        self.data_project = {'name': 'test project', 'users': [1]}
        self.data_todo = {'project': 'test project', 'text': 'test to-do', 'created_by_user': 1}
        self.admin = User.objects.create_superuser('drf', 'drf@drf.com', 'drfdrf')

    def test_get_list(self):
        response = self.client.get(self.api_todos)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin_mixer(self):
        project = mixer.blend(Project, users=[self.admin])
        todo = mixer.blend(ToDo, project=project, text='test', created_by_user=self.admin)
        self.client.login(username='drf', password='drfdrf')
        response = self.client.put(f'{self.api_todos}{todo.id}/', {'project': project.id, 'text': 'test to-do 1', 'created_by_user': self.admin.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo_ = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo_.text, 'test to-do 1')
        self.client.logout()
