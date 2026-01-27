from rest_framework import serializers
from .models import Order, OrderItem
from product.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']
        read_only_fields = ['price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'full_name', 'phone_number', 'shipping_address', 'status', 'total_amount', 'items', 'created_at']
        read_only_fields = ['user', 'total_amount']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        order = Order.objects.create(user=user, **validated_data)
        
        total = 0
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            item = OrderItem.objects.create(order=order, product=product, quantity=quantity, price=product.price)
            total += item.price * quantity
        
        order.total_amount = total
        order.save()
        return order
