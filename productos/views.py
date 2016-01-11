from django.shortcuts import render
from .models import Producto
# Create your views here.
def producto(request):
    productos = Producto.objects.all()
    return render(request, 'producto/product.html', {'producto':productos})