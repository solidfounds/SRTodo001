__author__ = 'comp-1'
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [

    url(r'^$', 'vistas.views.index', name='home'),
    url('', include('social.apps.django_app.urls', namespace='social')),

    url(r'^salir/$', 'users.views.LogOut', name='logout'),

    url(r'^inmobiliario/$', 'vistas.views.inmobiliario', name='inmobiliario'),
    url(r'^producto/$', 'vistas.views.producto', name='producto'),
    #url(r'^plate/', include('django_spaghetti.urls')),


     #url(r'^$', 'users.views.userlogin', name='login'),
]
