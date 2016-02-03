from django.db import models
from users.models import User
from productos.models import Inflable
# Create your models here.

class Favoritos(models.Model):
    usuario = models.ForeignKey(User)
    productos = models.ForeignKey(Inflable)

