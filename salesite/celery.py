import os
import logging
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'salesite.settings')

app = Celery('salesite', broker="redis://localhost:6379/0")

# Set the logging level to DEBUG
logging.getLogger().setLevel(logging.DEBUG)

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
