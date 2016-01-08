# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categoria',
            name='nombre',
            field=models.CharField(null=True, max_length=120),
        ),
        migrations.AlterField(
            model_name='imagenesp',
            name='nombre',
            field=models.CharField(null=True, max_length=72),
        ),
        migrations.AlterField(
            model_name='marca',
            name='nombre',
            field=models.CharField(null=True, max_length=60),
        ),
        migrations.AlterField(
            model_name='producto',
            name='imagen',
            field=models.ManyToManyField(null=True, to='productos.ImagenesP'),
        ),
        migrations.AlterField(
            model_name='producto',
            name='precio_flete',
            field=models.SmallIntegerField(null=True),
        ),
    ]
