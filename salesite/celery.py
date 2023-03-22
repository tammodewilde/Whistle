import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'salesite.settings')

app = Celery('salesite', broker="redis://localhost:6379/0")
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
