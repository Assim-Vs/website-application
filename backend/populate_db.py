import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vasthramalika.settings')
django.setup()

from product.models import Category, Product

def populate():
    print("Populating database...")

    # Create Categories
    cat_men, _ = Category.objects.get_or_create(name='Men', slug='men')
    cat_ladies, _ = Category.objects.get_or_create(name='Ladies', slug='ladies')
    cat_kids, _ = Category.objects.get_or_create(name='Kids', slug='kids')
    
    # Subcategories (Optional but good for header)
    Category.objects.get_or_create(name='Shirts', slug='men-shirts', parent=cat_men)
    Category.objects.get_or_create(name='Sarees', slug='ladies-sarees', parent=cat_ladies)
    Category.objects.get_or_create(name='Frocks', slug='kids-frocks', parent=cat_kids)

    print("Categories created.")

    # Create Products
    products_data = [
        {
            'name': 'Classic Silk Saree',
            'category': cat_ladies,
            'price': 4500,
            'description': 'A beautiful premium silk saree.',
            'is_premium': True,
            'is_ladies_special': True,
            'serial_number': 'LAD-001'
        },
        {
            'name': 'Men Formal Shirt',
            'category': cat_men,
            'price': 1200,
            'description': 'Crisp white formal shirt.',
            'is_premium': False,
            'is_ladies_special': False,
            'serial_number': 'MEN-001'
        },
        {
            'name': 'Kids Party Wear',
            'category': cat_kids,
            'price': 800,
            'description': 'Comfortable and stylish for kids.',
            'is_premium': False,
            'is_ladies_special': False,
            'serial_number': 'KID-001'
        },
        {
            'name': 'Royal Wedding Lehenga',
            'category': cat_ladies,
            'price': 15000,
            'description': 'Exclusive collection for weddings.',
            'is_premium': True,
            'is_ladies_special': True,
            'serial_number': 'LAD-002'
        }
    ]

    for p_data in products_data:
        # Check if product with this serial exists
        if not Product.objects.filter(serial_number=p_data['serial_number']).exists():
            Product.objects.create(
                name=p_data['name'],
                category=p_data['category'],
                price=p_data['price'],
                description=p_data['description'],
                is_premium=p_data['is_premium'],
                is_ladies_special=p_data.get('is_ladies_special', False),
                serial_number=p_data['serial_number']
            )

    print("Products created.")

if __name__ == '__main__':
    populate()
