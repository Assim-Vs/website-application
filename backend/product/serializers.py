from rest_framework import serializers
from .models import Product, Category, ShopUpdate

class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent', 'children']

    def get_children(self, obj):
        if obj.children.exists():
            return CategorySerializer(obj.children.all(), many=True).data
        return []

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'serial_number', 'category', 'category_name', 'price', 'description', 'image', 'video_url', 'sizes', 'is_active', 'is_premium']

class ShopUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopUpdate
        fields = ['id', 'title', 'content', 'image', 'created_at']
