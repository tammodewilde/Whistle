import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from .models import Subscriber, Brand, Category
from django.contrib import messages
from .tasks import getmail
from django.core.paginator import Paginator
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail



def index(request):
    allbrands = Brand.objects.order_by('id') # Fetch all brands and order by 'id'
    paginator = Paginator(allbrands, 16)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    brand_logos = [{'name': brand.name, 'logo_data': brand.logo_data} for brand in allbrands]
    variabelen = {'page_obj': page_obj, 'brand_logos': brand_logos}
    
    if request.method == "GET":                      
        # return render(request, 'sales1.html', variabelen)
        return render(request, 'temp.html', variabelen)



    if request.method == 'POST':
        email = request.POST.get('email')
        brands = request.POST.get('selected-brands-hidden')
        brands = brands.split(",")
        brandlist = [Brand.objects.get(name=brandname) for brandname in brands]

        if email:
            subscriber, created = Subscriber.objects.get_or_create(email=email)
            subscriber.brands.add(*brandlist)

            if created:
                # handle successful subscription
                messages.success(request, 'Your subscription was successful!')
                return render(request, 'sales1.html', variabelen)
            else:
                # handle existing subscriber
                messages.error(request, 'Email adress is allready subscribed!')
                return render(request, 'sales1.html', variabelen)
        else:
            print("error")
            messages.error(request, 'There was an error with your subscription. Please try again.')

def aboutus(request):

    return render(request, "aboutus.html")

def contact(request):

    return render(request, "contact.html")

def faq(request):

    return render(request, "faq.html")

@receiver(post_save, sender=Subscriber)
def send_confirmation_email(sender, instance, created, **kwargs):
    if created and not instance.confirmed:
        subject = 'Confirm your Email!'
        message = f'Hi,\n\nPlease click the following link to receive discounts of your favourite brands: http://127.0.0.1:8000/confirm/{instance.email_confirm_token}/\n\nThanks for subscribing!\n\n'
        sender_email = 'salealert.business@gmail.com'
        recipient_email = instance.email
        send_mail(subject, message, sender_email, [recipient_email])


def confirm_email(request, token):
    variabelen = {"temp":"temp"}
    try:
        subscriber = Subscriber.objects.get(email_confirm_token=token)
    except Subscriber.DoesNotExist:
        messages.error(request, "Something went wrong, please try again later....")
        return render(request, 'sales1.html', variabelen)

    # Check if the confirmation link has already been used
    if subscriber.confirmed:
        messages.error(request, "Email allready confirmed!")
        return render(request, 'sales1.html', variabelen)
    
    # Update the confirmed field
    subscriber.confirmed = True
    subscriber.save()

    # Redirect to a confirmation page
    messages.success(request, "Email confirmed!")
    return render(request, 'sales1.html', variabelen)



# allbrands = [{'adidas-9.svg': 'Adidas'}, {"gucci.svg": "Gucci"}, {"champion.svg": "Champion"}, {'louis-vuitton.svg': 'Louis Vuitton'}, {'carhartt.svg':'Carthartt'}, {'converse.svg': 'Converse'}, 
    #              {'vans.svg':'Vans'} , {'nike.svg':'Nike'}, {'uniqlo.svg':'Uniqlo'}, {'stussy.svg':'Stussy'}, {'off-white.svg':'Off White'}, {'under-armour.svg':'Under Armour'}, {'puma.svg':'puma'}, {'chanel.svg':'Chanel'}, 
    #              {'gap.svg':'GAP'}, {'armani.svg':'Armani'},{'lacoste.svg':'Lacoste'},{'superdry.svg':'Superdry'},{'thenorthface.svg':'The North Face'},{'timberland.svg':'Timberland'},{'fila.svg':'Fila'},{'obey.svg':'Obey'}]
    