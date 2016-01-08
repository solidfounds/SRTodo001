# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('password', models.CharField(verbose_name='password', max_length=128)),
                ('last_login', models.DateTimeField(null=True, blank=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(verbose_name='superuser status', default=False, help_text='Designates that this user has all permissions without explicitly assigning them.')),
                ('username', models.CharField(unique=True, max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('avatar', models.ImageField(upload_to='users', blank=True, null=True)),
                ('tipo', models.CharField(choices=[('ADM', 'Admin'), ('ARA', 'Arrendatario'), ('ARU', 'Rentador')], max_length=2, blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(to='auth.Group', blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', verbose_name='groups', related_name='user_set', related_query_name='user')),
                ('user_permissions', models.ManyToManyField(to='auth.Permission', blank=True, help_text='Specific permissions for this user.', verbose_name='user permissions', related_name='user_set', related_query_name='user')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Correos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('tipo_Correo', models.CharField(choices=[('Gm', 'GMAIL'), ('HM', 'Hotmail'), ('Ya', 'Yahoo'), ('Ot', 'OTROS')], max_length=2)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='DatosContacto',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('usuario', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DatosUsuarios',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('fecha_nacimiento', models.DateField()),
                ('genero', models.CharField(max_length=1)),
                ('usuario', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RedesS',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('tipo_reds', models.CharField(choices=[('FB', 'Facebook'), ('TW', 'Twitter'), ('G+', 'Google Plus')], max_length=2)),
                ('url', models.URLField()),
                ('datos_contacto', models.ForeignKey(to='users.DatosContacto')),
            ],
        ),
        migrations.CreateModel(
            name='Telefonos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('tipo_telefono', models.CharField(choices=[('CE', 'Celular'), ('TC', 'Telefono Casa'), ('TT', 'Telefono Trabajo')], max_length=2)),
                ('telefono', models.SmallIntegerField()),
                ('datos_contacto', models.ForeignKey(to='users.DatosContacto')),
            ],
        ),
        migrations.AddField(
            model_name='correos',
            name='datos_contacto',
            field=models.ForeignKey(to='users.DatosContacto'),
        ),
    ]
