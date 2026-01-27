from django.core.management.base import BaseCommand
from product.models import Category, Product

class Command(BaseCommand):
    help = 'Populates hierarchical categories for Mega Menu'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing categories...')
        Category.objects.all().delete()
        self.stdout.write('Creating Mega Menu Structure...')

        structure = {
            'Men': {
                'Topwear': ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Jackets'],
                'Bottomwear': ['Jeans', 'Casual Trousers', 'Formal Trousers', 'Shorts'],
            },
            'Ladies': {
                'Indian & Fusion Wear': ['Kurtas', 'Sarees', 'Ethnic Skirts', 'Leggings'],
                'Western Wear': ['Dresses', 'Tops', 'Jeans', 'Jumpsuits'],
            },
            'Kids': {
                'Boys Clothing': ['T-Shirts', 'Shirts', 'Jeans'],
                'Girls Clothing': ['Dresses', 'Tops', 'Trousers'],
                'Infants': ['Rompers', 'Sets']
            }
        }

        for root_name, children in structure.items():
            root_slug = root_name.lower().replace(' ', '-')
            root_cat, _ = Category.objects.get_or_create(name=root_name, defaults={'slug': root_slug})
            self.stdout.write(f'Created Root: {root_name}')

            for child_name, subchildren in children.items():
                child_slug = f"{root_slug}-{child_name.lower().replace(' ', '-').replace('&', 'and')}"
                child_cat, _ = Category.objects.get_or_create(
                    name=child_name, 
                    parent=root_cat,
                    defaults={'slug': child_slug}
                )
                
                for sub_name in subchildren:
                    sub_slug = f"{child_slug}-{sub_name.lower().replace(' ', '-')}"
                    Category.objects.get_or_create(
                        name=sub_name, 
                        parent=child_cat,
                        defaults={'slug': sub_slug}
                    )
        
        self.stdout.write(self.style.SUCCESS('Successfully populated Mega Menu categories!'))

        # Add Sample Products
        self.stdout.write('Adding sample products...')
        
        # Sample images (using placeholders for script)
        p1, _ = Product.objects.get_or_create(
            serial_number="VM-L-001",
            defaults={
                'name': "Premium Silk Saree",
                'category': Category.objects.get(slug='ladies-indian-and-fusion-wear-sarees'),
                'price': 4500,
                'description': "Elegant royal silk saree for special occasions.",
                'sizes': "Free Size",
                'is_premium': True,
                'is_ladies_special': True
            }
        )
        
        p2, _ = Product.objects.get_or_create(
            serial_number="VM-L-002",
            defaults={
                'name': "Designer Kurta Set",
                'category': Category.objects.get(slug='ladies-indian-and-fusion-wear-kurtas'),
                'price': 2800,
                'description': "Beautifully handcrafted kurta set.",
                'sizes': "S,M,L,XL",
                'is_premium': True,
                'is_ladies_special': True
            }
        )

        p3, _ = Product.objects.get_or_create(
            serial_number="VM-M-001",
            defaults={
                'name': "Royal Cotton Dothi",
                'category': Category.objects.get(slug='men'), # Using root or sub
                'price': 1200,
                'description': "Traditional pure white cotton dothi with gold border.",
                'sizes': "Standard",
                'is_premium': False
            }
        )
        
        # Ensure 'men', 'ladies', 'kids' roots have at least one product for home page view
        Product.objects.get_or_create(
            serial_number="VM-L-003",
            defaults={
                'name': "Women's Short Suit",
                'category': Category.objects.get(slug='ladies'),
                'price': 3500,
                'description': "Stylish and trendy short suit for a perfect look.",
                'sizes': "M,L",
                'is_premium': True,
                'is_ladies_special': True
            }
        )

        self.stdout.write(self.style.SUCCESS('Sample products added!'))
