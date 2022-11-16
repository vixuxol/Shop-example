from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        # fields = ['_id', 'name', 'image', 'description', 'brand', 'category', 'price', 'countInStock', 'rating', 'numReviews']

