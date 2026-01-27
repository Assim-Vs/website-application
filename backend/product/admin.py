from django.contrib import admin
from .models import Category, Product, ShopUpdate

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'serial_number', 'category', 'price', 'is_active', 'is_premium', 'is_ladies_special')
    list_filter = ('category', 'is_active', 'is_premium', 'is_ladies_special')
    search_fields = ('name', 'serial_number', 'description')

@admin.register(ShopUpdate)
class ShopUpdateAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title', 'content')
