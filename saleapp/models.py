from django.db import models
import uuid
from django.utils.safestring import mark_safe
import base64



# Create your models here.
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=255)
    logo = models.FileField(upload_to='brand_logos/', blank=True, null=True)  # Use FileField instead of TextField
    sale = models.BooleanField(default=False)
    categories = models.ManyToManyField(Category)

    def logo_tag(self):
        if self.logo:
            return mark_safe(f'<img src="{self.logo.url}" style="max-width: 100px; max-height: 100px;" />')
        return None
    logo_tag.short_description = 'Logo Preview'
    logo_tag.allow_tags = True

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
    
