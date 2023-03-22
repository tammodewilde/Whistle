from django.db import models
import uuid


# Create your models here.
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=255)
    logo = models.FileField(upload_to='brand_logos/')
    sale = models.BooleanField(default=False)
    categories = models.ManyToManyField(Category)
    
    def __str__(self):
        return self.name
    
class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    brands = models.ManyToManyField(Brand)
    date_subscribed = models.DateTimeField(auto_now_add=True)
    email_confirm_token = models.UUIDField(default=uuid.uuid4, editable=False)
    confirmed = models.BooleanField(default=False)
    confirmation_sent = models.DateTimeField(null=True)



    def __str__(self):
        return self.email
    
