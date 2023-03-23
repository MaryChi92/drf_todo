from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework import viewsets, mixins

from .models import User
from .serializers import UserModelSerializer, UserModelBaseSerializer


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                       viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelBaseSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializer
        return UserModelBaseSerializer
