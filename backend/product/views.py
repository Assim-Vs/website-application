from rest_framework import viewsets
from .models import Product, Category, ShopUpdate
from .serializers import ProductSerializer, CategorySerializer, ShopUpdateSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    filterset_fields = ['parent']

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    filterset_fields = ['category', 'category__slug', 'is_premium', 'is_ladies_special']
    ordering = ['-created_at']

class ShopUpdateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ShopUpdate.objects.all().order_by('-created_at')
    serializer_class = ShopUpdateSerializer
