# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bodega',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('titulo', models.CharField(max_length=254)),
                ('categoria', models.CharField(default='bodega', max_length=6)),
                ('foto', models.ImageField(upload_to='img/inmuebles/bodegas/')),
                ('tipo_de_bodega', models.CharField(max_length=50)),
                ('ubicacion', models.CharField(max_length=150)),
                ('telefono', models.IntegerField()),
                ('antiguedad', models.CharField(max_length=150)),
                ('superficie', models.DecimalField(max_digits=10, decimal_places=5)),
                ('banos', models.IntegerField()),
                ('estacionamiento', models.CharField(max_length=2)),
                ('niveles', models.IntegerField()),
                ('caracteristicas_adicionales', models.CharField(max_length=250)),
                ('fecha_publicacion', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Casas',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('titulo', models.CharField(max_length=250)),
                ('categoria', models.CharField(default='casas', max_length=5)),
                ('foto', models.ImageField(upload_to='img/inmuebles/casas/')),
                ('estado', models.CharField(max_length=25)),
                ('direccion', models.CharField(max_length=50, verbose_name='dirección')),
                ('numero', models.SmallIntegerField(verbose_name='número')),
                ('antiguedad', models.CharField(max_length=25)),
                ('banos', models.SmallIntegerField(verbose_name='baños')),
                ('recamaras', models.SmallIntegerField()),
                ('superficie', models.DecimalField(max_digits=10, decimal_places=2)),
                ('amueblado', models.BooleanField()),
                ('tipo_terreno', models.CharField(max_length=25)),
                ('estacionamiento', models.BooleanField()),
                ('niveles', models.SmallIntegerField()),
                ('cisterna', models.BooleanField()),
                ('fecha_publicacion', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('nombre', models.CharField(max_length=120, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Combi',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('titutlo', models.CharField(max_length=240)),
                ('categoria', models.CharField(default='transporte', max_length=10)),
                ('foto', models.ImageField(upload_to='img/transporte/combis/')),
                ('precio', models.PositiveIntegerField(verbose_name='precio por dia')),
                ('fecha_publicacion', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='ImagenesP',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('nombre', models.CharField(max_length=72, null=True)),
                ('imagen', models.ImageField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Inflable',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('titulo', models.CharField(max_length=240)),
                ('categoria', models.CharField(default='inflables', max_length=9)),
                ('foto', models.ImageField(upload_to='img/servicios/inflables/')),
                ('precio', models.PositiveIntegerField(verbose_name='precio por dia')),
                ('fecha_publicacion', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Marca',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('nombre', models.CharField(max_length=60, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('nombre', models.CharField(max_length=100)),
                ('slug', models.SlugField(blank=True)),
                ('descripcion', models.TextField()),
                ('precio_flete', models.SmallIntegerField(null=True)),
                ('categoria', models.ForeignKey(to='productos.Categoria')),
                ('marca', models.ForeignKey(blank=True, null=True, to='productos.Marca')),
            ],
        ),
    ]
