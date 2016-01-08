from django.db import models

# Create your models here.

class Flete(models.Model):
    pass

class TipoRenta(models.Model):
    dias = models.DateField()
    semanas = models.DateField()


class Usuario(models.Model):
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=60)
    def __str__(self):
        return self.nombre





