from rest_framework import serializers

from .models import Project, ToDo


class ProjectModelSerializer(serializers.ModelSerializer):
    # users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'


class ToDoModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'
