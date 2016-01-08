from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings

urlpatterns = patterns('',
        url(r'^salir/$', 'users.views.LogOut', name='logout'),
        url('', include('social.apps.django_app.urls', namespace='social'))
)

