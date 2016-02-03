from django.contrib import admin
from .models import  Usuario

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    pass

