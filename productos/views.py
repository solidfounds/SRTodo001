from django.http import Http404
from django.shortcuts import render
from .models import Producto
# Create your views here.
def producto_detalle(request,object_id=None):
    if object_id is not None:
        product = Producto.objects.get(id=object_id)
        template = "detalle_producto.html"
        context = {
            "object":product
        }
        return render(request, template, context)
    else:
        raise Http404
