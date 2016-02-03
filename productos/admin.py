from django.contrib import admin
from .models import Marca, Producto, ImagenesP, Categoria, Bodega, Casas, Inflable, Combi
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

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    pass


#categorias inmuebles
@admin.register(Bodega)
class BodegaInmueblesAdmin(admin.ModelAdmin):
    pass

@admin.register(Casas)
class CasasInmueblesAdmin(admin.ModelAdmin):
    pass

#servicios
@admin.register(Inflable)
class InflableServicioAdmin(admin.ModelAdmin):
    pass

#transporte
@admin.register(Combi)
class CombiTransporteAdmin(admin.ModelAdmin):
    pass