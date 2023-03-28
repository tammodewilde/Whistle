import requests
from bs4 import BeautifulSoup

scraping_targets = [
    {
        'url': 'https://example1.com',
        'tag': 'div',
        'attribute': 'class',
        'value': 'discount-code',
    },
    {
        'url': 'https://example2.com',
        'tag': 'span',
        'attribute': 'class',
        'value': 'sale-details',
    },
    # Add more scraping targets as needed
]

def scrape_website(url, tag, attribute, value):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    elements = soup.find_all(tag, {attribute: value})
    return elements
