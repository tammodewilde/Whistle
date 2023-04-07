import requests
from bs4 import BeautifulSoup
import re

scraping_targets = [
    {
        'url': 'https://king-prawn-app-rjyqd.ondigitalocean.app/',
        'tag': 'body',
        'attribute': None,
        'value': re.compile(r'(discount|promo|coupon|voucher|offer|deal|savings|special offer|limited time offer|exclusive offer|extra savings|limited time deal|promo savings|discount promotion|promo promotion|voucher promotion|limited time promotion|savings promotion)\s(code|deal|savings|offer|promotion)'),
    },
    # Add more scraping targets as needed
]

def scrape_website(url, tag, attribute, value):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    elements = soup.find_all(tag, {attribute: value})
    for element in elements:
        text = element.get_text().lower()
        if value.search(text):
            print(f"Found matching text: {text.strip()}")
            return response.text
    return None
