from django import forms
from django.contrib import admin
from .models import Subscriber, Brand, Category
import base64

admin.site.register(Subscriber)
admin.site.register(Brand)  # Register the Brand model with the custom admin class
admin.site.register(Category)
