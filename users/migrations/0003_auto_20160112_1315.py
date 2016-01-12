# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20160107_1018'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='tipo',
            field=models.CharField(null=True, max_length=2, choices=[('ARA', 'Arrendatario'), ('ARU', 'Rentador')], blank=True),
        ),
    ]
