# Generated by Django 4.1.7 on 2023-03-15 12:56

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('saleapp', '0007_alter_brand_logo'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscriber',
            name='confirmation_sent',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='subscriber',
            name='confirmed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='subscriber',
            name='email_confirm_token',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]
