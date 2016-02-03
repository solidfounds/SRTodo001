from django.shortcuts import render

# Create your views here.
from django.views.generic import View


def mis_productos(request):
    a = 2 +2
    return render(request, 'mis_productos.html', {'a':a,})

def mis_productos_he_rentado(request):
    return render(request, 'mis_productos_he_rentado.html')

def mis_favoritos(request):
    return render(request, 'mis_favoritos.html')

class ProductoFavorito(View):

    def post(self, request, ):