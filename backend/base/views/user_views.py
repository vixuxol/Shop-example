from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import UserSerializer, UserSerializerWithToken


from rest_framework_simplejwt.views import TokenObtainPairView
from base.serializers import MyTokenObtainPairSerializer

from django.contrib.auth.hashers import make_password
from rest_framework import status

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user # если пользователь залогинился с помощью системы по умолчанию - 
                        # его можно увиедть таким образом
   
    serializer =UserSerializer(user, many = False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many = True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['username'],
            email = data['email'],
            password = make_password(data['password']),
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': "User with this username already exist"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)