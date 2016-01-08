# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vistas', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Marca',
        ),
        migrations.RemoveField(
            model_name='usuario',
            name='mis_productos',
        ),
        migrations.DeleteModel(
            name='Producto',
        ),
    ]
