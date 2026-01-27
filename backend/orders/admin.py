from django.contrib import admin
import csv
from django.http import HttpResponse
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('price',)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'full_name', 'status', 'total_amount', 'created_at')
    list_filter = ('status', 'created_at')
    list_editable = ('status',)
    search_fields = ('full_name', 'phone_number', 'id')
    inlines = [OrderItemInline]
    readonly_fields = ('total_amount',)
    actions = ['export_to_excel', 'print_bill', 'mark_as_shipped', 'mark_as_delivered', 'mark_as_cancelled']

    @admin.action(description="Mark selected orders as Shipped")
    def mark_as_shipped(self, request, queryset):
        updated = queryset.update(status='SHIPPED')
        self.message_user(request, f"{updated} orders successfully marked as Shipped.")

    @admin.action(description="Mark selected orders as Delivered")
    def mark_as_delivered(self, request, queryset):
        updated = queryset.update(status='DELIVERED')
        self.message_user(request, f"{updated} orders successfully marked as Delivered.")

    @admin.action(description="Mark selected orders as Cancelled")
    def mark_as_cancelled(self, request, queryset):
        updated = queryset.update(status='CANCELLED')
        self.message_user(request, f"{updated} orders successfully marked as Cancelled.")

    @admin.action(description="Export selected to Excel")
    def export_to_excel(self, request, queryset):
        try:
            from openpyxl import Workbook
        except ImportError:
            self.message_user(request, "Excel export is not available. Please install 'openpyxl'.", level="error")
            return
        
        wb = Workbook()
        ws = wb.active
        ws.title = "Orders"
        
        headers = ["Order ID", "User", "Full Name", "Phone", "Status", "Total Amount", "Created At"]
        ws.append(headers)
        
        for order in queryset:
            ws.append([
                order.id,
                order.user.username,
                order.full_name,
                order.phone_number,
                order.get_status_display(),
                order.total_amount,
                order.created_at.strftime("%Y-%m-%d %H:%M")
            ])
            
        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="orders.xlsx"'
        wb.save(response)
        return response

    @admin.action(description="Print Bills (PDF)")
    def print_bill(self, request, queryset):
        try:
            from reportlab.pdfgen import canvas
            from reportlab.lib.pagesizes import letter
        except ImportError:
            self.message_user(request, "PDF printing is not available. Please install 'reportlab'.", level="error")
            return
            
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="bills.pdf"'
        
        p = canvas.Canvas(response, pagesize=letter)
        width, height = letter
        
        for order in queryset:
            p.setFont("Helvetica-Bold", 16)
            p.drawString(100, height - 50, f"VASTHRAMALIKA - INVOICE #{order.id}")
            p.setFont("Helvetica", 11)
            p.drawString(100, height - 80, f"Customer: {order.full_name}")
            p.drawString(100, height - 95, f"Phone: {order.phone_number}")
            p.drawString(100, height - 110, f"Address: {order.shipping_address}")
            p.drawString(100, height - 125, f"Date: {order.created_at.strftime('%Y-%m-%d %H:%M')}")
            
            p.line(100, height - 140, 500, height - 140)
            
            y = height - 160
            p.setFont("Helvetica-Bold", 11)
            p.drawString(100, y, "Item")
            p.drawString(350, y, "Qty")
            p.drawString(450, y, "Price")
            
            y -= 20
            p.setFont("Helvetica", 11)
            for item in order.items.all():
                p.drawString(100, y, str(item.product.name if item.product else "Deleted Product")[:40])
                p.drawString(350, y, str(item.quantity))
                p.drawString(450, y, f"Rs.{item.price}")
                y -= 20
                if y < 100:
                    p.showPage()
                    y = height - 50
            
            p.line(100, y - 10, 500, y - 10)
            p.setFont("Helvetica-Bold", 12)
            p.drawString(100, y - 30, f"TOTAL AMOUNT: Rs.{order.total_amount}")
            
            p.showPage() # New page for each bill
            
        p.save()
        return response
