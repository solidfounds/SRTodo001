from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin



# Create your models here.
class UserManager(BaseUserManager, models.Manager):
	def _create_user(self, username, email, password, is_staff, is_superuser, **extra_fields):
		email = self.normalize_email(email)
		#if not email:
			#raise ValueError('el email debe de ser obligatorio')
		user = self.model(username = username, email=email, is_active= True, is_staff = is_staff, is_superuser = is_superuser, **extra_fields)
		user.set_password(password)
		user.save(using = self._db)
		return user

	def create_user(self, username, email, password=None, **extra_fields):
		return self._create_user(username, email, password, False, False, **extra_fields)

	def create_superuser(self, username, email, password=None, **extra_fields):
		return self._create_user(username, email, password, True, True, **extra_fields)


TIPO_USUARIO=(
    ('ARA', 'Arrendatario'),
	('ARU', 'Rentador'),
)

TIPO_SEXO=(
	('M', 'Masculino'),
	('F', 'Femenino',)
)

class User(AbstractBaseUser, PermissionsMixin):

	username = models.CharField(max_length=100, unique=True)
	email = models.EmailField()
	first_name = models.CharField(max_length=100)
	last_name = models.CharField(max_length=100)
	avatar = models.ImageField(upload_to = 'users', null=True, blank=True)
	tipo = models.CharField(max_length=2, choices=TIPO_USUARIO, null=True, blank=True)
	#sexo =models.CharField(max_length=2,choices=TIPO_SEXO)
	#celuar =models.SmallIntegerField()
	#tel_casa =models.SmallIntegerField('Telefono Casa')

	objects = UserManager()

	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default = False)

	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = ['email']

	def get_short_name(self):
		return self.username

class DatosUsuarios(models.Model):
	usuario = models.OneToOneField(User)
	fecha_nacimiento = models.DateField()
	genero = models.CharField(max_length=1)

	def __str__(self):
		return self.usuario.username

class DatosContacto(models.Model):
	usuario = models.OneToOneField(User)

	def __str__(self):
		return self.usuario.username

TIPOS_TELEFONO = (
	('CE','Celular'),
	('TC','Telefono Casa'),
	('TT','Telefono Trabajo'),
)

class Telefonos(models.Model):
	datos_contacto = models.ForeignKey(DatosContacto)
	tipo_telefono = models.CharField(max_length=2, choices=TIPOS_TELEFONO)
	telefono = models.SmallIntegerField()

TIPOS_REDES = (
	('FB','Facebook'),
	('TW','Twitter'),
	('G+','Google Plus'),
)

class RedesS(models.Model):
	datos_contacto = models.ForeignKey(DatosContacto)
	tipo_reds =models.CharField(max_length=2, choices=TIPOS_REDES)
	url = models.URLField()

TIPOS_MAIL = (
	('Gm','GMAIL'),
	('HM','Hotmail'),
	('Ya','Yahoo'),
	('Ot','OTROS'),
)
class Correos(models.Model):
	datos_contacto = models.ForeignKey(DatosContacto)
	tipo_Correo =models.CharField(max_length=2, choices=TIPOS_MAIL)
	email = models.EmailField()
