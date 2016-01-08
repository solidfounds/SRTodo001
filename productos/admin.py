from django.contrib import admin
from .models import Marca, Producto, ImagenesP, Categoria
# Register your models here.
"""
    @admin.register(TipoRenta)
class TipoRentaAdmin(admin.ModelAdmin):
    pass
"""

@admin.register(Marca)
class MarcaAdmin(admin.ModelAdmin):
    pass

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    pass

@admin.register(ImagenesP)
class ImagenesPAdmin(admin.ModelAdmin):
    pass

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    pass