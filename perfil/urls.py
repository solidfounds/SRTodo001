
from django.conf.urls import include, url, patterns
from django.contrib import admin
from django.conf.urls import  handler404
from vistas.views import handler404


urlpatterns = [

    url(r'^mis_productos/', 'perfil.views.mis_productos', name='mis_productos'),
    url(r'^productos_querente/', 'perfil.views.mis_productos_he_rentado', name='productos_he_rentado'),
    url(r'^mis_favoritos/', 'perfil.views.mis_favoritos', name='mis_favoritos')
]