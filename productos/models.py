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

# def product_post_save_reciever(sender, instance, *args, **kwargs):
#     if instance.slug != slugify(instance.nombre):
#         instance.slug = slugify(instance.nombre)
#         instance.save()
#
# post_save.connect(product_post_save_reciever, sender=Producto)
#

