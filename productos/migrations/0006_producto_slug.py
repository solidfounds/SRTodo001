# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0005_remove_producto_imagen'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='slug',
            field=models.SlugField(default='slug-field'),
        ),
    ]
