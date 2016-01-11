from django.shortcuts import render, redirect, render_to_response
from django.contrib.auth import logout, authenticate
from users.forms import  UserRegisterForm, LoginForm
from users.models import User
from users.functions import LogIn
from productos.models import Producto
# Create your views here.

def index(request):
    if request.method == 'POST':
        if 'myForm' in request.POST:
            user_register = UserRegisterForm(request.POST)
            if user_register.is_valid():
                User.objects.create_user(username=user_register.cleaned_data['username'],
                                             email=user_register.cleaned_data['email'],
                                             password=user_register.cleaned_data['password'],
                                           #tipo=user_register.cleaned_data['tipo'],
                                         )
                LogIn(request, user_register.cleaned_data['username'],
                          user_register.cleaned_data['password'])
                return redirect('home')
        if 'login_form' in request.POST:
            login_form = LoginForm(request.POST)
            if login_form.is_valid():
                LogIn(request, login_form.cleaned_data['username'],
                                   login_form.cleaned_data['password'])
                user = User.objects.get(username = login_form.cleaned_data['username'])
                #user = User.objects.filter(request.user.username == login_form.cleaned_data['username'])
                return redirect('/')

    user_register = UserRegisterForm()
    login_form = LoginForm()
    return render(request, 'index.html', {'user_register': user_register, 'login_form': login_form })

def producto(request):
    productos = Producto.objects.all()
    return render(request, 'producto/product.html', {'producto':productos})


#categirias
def inmobiliario(request):
    inmobiliario = Producto.objects.filter(categoria__nombre="Inmobiliario")
    return render(request,'categoria/inmobiliario.html', {'inmbl':inmobiliario} )


def entrada(request, pk):
    identrada = Producto.objects.get(pk=int(pk))
    comentario = Comentario.objects.filter(identrada = identrada)
    d = dict(entrada= identrada,comentario = comentario,form=FormularioComentario(),usuario=request.user)
    d.update(csrf(request))
    return render_to_response("entrada.html",d)