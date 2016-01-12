"""SRTodo001 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'vistas.views.index', name='home'),
    url('', include('social.apps.django_app.urls', namespace='social')),

    url(r'^salir/$', 'users.views.LogOut', name='logout'),

    url(r'^inmobiliario/$', 'vistas.views.inmobiliario', name='inmobiliario'),
    url(r'^producto/(?P<object_id>\d+)/$', 'productos.views.producto_detalle', name='producto_detalle'),
    #url(r'^plate/', include('django_spaghetti.urls')),


     #url(r'^$', 'users.views.userlogin', name='login'),
]
