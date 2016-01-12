from django.http import Http404
from django.shortcuts import render, get_object_or_404
from .models import Producto
# Create your views here.
def producto_detalle_slug(request,slug=None):
    try:
        product = get_object_or_404(Producto, slug=slug)
    except Producto.MultipleObjectsReturned:
        product = Producto.objects.filter(slug=slug).order_by("-nombre").first()
    template = "detalle_producto.html"
    context = {
        "object":product
    }
    return render(request, template, context)

def producto_detalle(request,object_id=None):
    product = get_object_or_404(Producto, id=object_id)
    template = "detalle_producto.html"
    context = {
        "object":product
    }
    return render(request, template, context)
