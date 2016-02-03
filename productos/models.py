#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.db import models
from django.db.models.signals import pre_save, post_save
from django.utils.text import slugify
# Create your models here.

class Marca(models.Model):
    nombre = models.CharField(max_length=60, null=True)

    def __str__(self):
        return self.nombre

class ImagenesP(models.Model):
    nombre = models.CharField(max_length=72, null=True)
    imagen = models.ImageField()

    def __str__(self):
        return self.imagen

class Categoria(models.Model):
    nombre = models.CharField(max_length=120, null=True)


    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(blank=True)#(unique=True)
    descripcion = models.TextField()
    precio_flete = models.SmallIntegerField(null=True)
    marca = models.ForeignKey(Marca, null=True, blank=True)
    categoria = models.ForeignKey(Categoria)

    def __str__(self):
        return self.nombre

def product_pre_save_reciever(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.nombre)+ "-"+ slugify(instance.id)

pre_save.connect(product_pre_save_reciever, sender=Producto)



class Casas(models.Model):
    titulo = models.CharField(max_length=250)
    categoria = models.CharField(default="casas", max_length=5)
    foto = models.ImageField(upload_to='img/inmuebles/casas/')
    estado = models.CharField(max_length=25)
    direccion = models.CharField('dirección',max_length=50)
    numero = models.SmallIntegerField('número',)
    antiguedad = models.CharField(max_length=25)
    banos = models.SmallIntegerField('baños',)
    recamaras = models.SmallIntegerField()
    superficie = models.DecimalField(max_digits=10, decimal_places=2)
    amueblado = models.BooleanField()
    tipo_terreno = models.CharField(max_length=25)
    estacionamiento = models.BooleanField()
    niveles = models.SmallIntegerField()
    cisterna = models.BooleanField()
    fecha_publicacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo


class Bodega(models.Model):
    titulo = models.CharField(max_length=254)
    categoria = models.CharField(default="bodega", max_length=6)
    foto = models.ImageField(upload_to='img/inmuebles/bodegas/')
    tipo_de_bodega = models.CharField(max_length=50)
    ubicacion = models.CharField(max_length=150)
    telefono = models.IntegerField()
    antiguedad = models.CharField(max_length=150)
    superficie = models.DecimalField(max_digits=10, decimal_places=5)
    banos = models.IntegerField()
    estacionamiento = models.CharField(max_length=2)
    niveles = models.IntegerField()
    caracteristicas_adicionales = models.CharField(max_length=250)
    fecha_publicacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo



#servicios

class Inflable(models.Model):
    titulo = models.CharField(max_length=240)
    categoria = models.CharField(default="inflables", max_length=9)
    foto = models.ImageField(upload_to='img/servicios/inflables/')
    precio = models.PositiveIntegerField('precio por dia',)
    fecha_publicacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo

#transporte
class Combi(models.Model):
    titutlo = models.CharField(max_length=240)
    categoria = models.CharField(default="transporte", max_length=10)
    foto = models.ImageField(upload_to='img/transporte/combis/')
    precio = models.PositiveIntegerField('precio por dia',)
    fecha_publicacion = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.titutlo