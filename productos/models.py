from django.db import models
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
    descripcion = models.TextField()
    precio_flete = models.SmallIntegerField(null=True)
    marca = models.ForeignKey(Marca, null=True, blank=True)
    categoria = models.ForeignKey(Categoria)

    def __str__(self):
        return self.nombre


