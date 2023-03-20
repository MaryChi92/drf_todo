import graphene
from graphene_django import DjangoObjectType
from todo.models import Project, ToDo
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ToDoType)
    all_users = graphene.List(UserType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    todos_by_project = graphene.List(ToDoType, name=graphene.String(required=False))

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_todos_by_project(self, info, name=None):
        todos = ToDo.objects.all()
        if name:
            todos = todos.filter(project__name=name)
        return todos


class ProjectMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, id):
        project = Project.objects.get(pk=id)
        project.name = name
        project.save()
        return ProjectMutation(project=project)


class Mutation(graphene.ObjectType):
    update_project = ProjectMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
