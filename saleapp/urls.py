from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import confirm_email


from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("aboutus", views.aboutus, name="aboutus"),
    path("contact", views.contact, name="contact"),
    path("faq", views.faq, name="faq"),

    path('confirm/<str:token>/', confirm_email, name='confirm_email'),

] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
 