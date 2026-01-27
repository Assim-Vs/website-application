from django.core.management.base import BaseCommand
from product.models import Category, Product
from django.core.files.base import ContentFile
import requests

class Command(BaseCommand):
    help = 'Populate database with sample data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating sample data...')
        
        # Categories
        cat_men, _ = Category.objects.get_or_create(name='Men', slug='men')
        cat_women, _ = Category.objects.get_or_create(name='Ladies', slug='ladies')
        cat_kids, _ = Category.objects.get_or_create(name='Kids', slug='kids')

        # Products
        products = [
            {
                'name': 'Royal Gold Sherwani',
                'serial_number': 'MEN-001',
                'category': cat_men,
                'price': 15000.00,
                'description': 'Handcrafted gold sherwani for weddings.',
                'image_url': 'https://via.placeholder.com/600x800/D4AF37/FFFFFF?text=Royal+Sherwani' 
            },
            {
                'name': 'Silk Kanchipuram Saree',
                'serial_number': 'LAD-001',
                'category': cat_women,
                'price': 25000.00,
                'description': 'Pure silk saree with zari border.',
                'image_url': 'https://via.placeholder.com/600x800/800000/FFFFFF?text=Silk+Saree'
            },
            {
                'name': 'Kids  Kurta Set',
                'serial_number': 'KID-001',
                'category': cat_kids,
                'price': 3500.00,
                'description': 'Comfortable cotton kurta set.',
                'image_url': 'https://via.placeholder.com/600x800/000080/FFFFFF?text=Kids+Kurta'
            }
        ]

        for p_data in products:
            product, created = Product.objects.get_or_create(
                serial_number=p_data['serial_number'],
                defaults={
                    'name': p_data['name'],
                    'category': p_data['category'],
                    'price': p_data['price'],
                    'description': p_data['description']
                }
            )
            if created:
                # Basic image mocking (in a real app, we'd download and save)
                self.stdout.write(f"Created {product.name}")
            else:
                self.stdout.write(f"Already exists {product.name}")

        self.stdout.write(self.style.SUCCESS('Successfully populated sample data'))
