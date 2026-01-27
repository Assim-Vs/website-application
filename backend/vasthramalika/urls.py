from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.http import HttpResponse

def home(request):
    return HttpResponse("Vasthramalika Backend is Running! 🚀<br>Go to <a href='/admin/'>/admin/</a> or use the Frontend at localhost:5173")

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('product.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('api/orders/', include('orders.urls')),
    # Future apps will be included here
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
