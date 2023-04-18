from django import forms
from django.contrib import admin
from .models import Subscriber, Brand, Category
import base64

class BrandAdminForm(forms.ModelForm):
    logo_upload = forms.FileField(required=False, widget=forms.ClearableFileInput(attrs={'accept': 'image/svg+xml'}))

    class Meta:
        model = Brand
        fields = ('name', 'logo_data', 'sale', 'categories')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            self.fields['logo_upload'].initial = self.instance.logo_data

    def save(self, commit=True):
        instance = super().save(commit=False)
        if self.cleaned_data['logo_upload']:
            instance.logo_data = self.cleaned_data['logo_upload'].read().decode('utf-8')  # Store the SVG data as plain text
        if commit:
            instance.save()
            self.save_m2m()
        return instance


class BrandAdmin(admin.ModelAdmin):
    form = BrandAdminForm
    list_display = ('name', 'logo_tag', 'sale', 'categories_display')
    readonly_fields = ('logo_tag',)

    def categories_display(self, obj):
        return ", ".join([category.name for category in obj.categories.all()])

    categories_display.short_description = 'Categories'

admin.site.register(Subscriber)
admin.site.register(Brand, BrandAdmin)  # Register the Brand model with the custom admin class
admin.site.register(Category)
