from saleapp.tasks import scrape_task

scraping_targets = [
    {
        'url': 'https://king-prawn-app-rjyqd.ondigitalocean.app/',
        'tag': 'body',
        'attribute': None,
        'value': r'(discount|promo|coupon|voucher|offer|deal|savings|special offer|limited time offer|exclusive offer|extra savings|limited time deal|promo savings|discount promotion|promo promotion|voucher promotion|limited time promotion|savings promotion)\s(code|deal|savings|offer|promotion)',
    },
    # Add more scraping targets as needed
]

if __name__ == "__main__":
    for target in scraping_targets:
        scrape_task.delay(target['url'], target['tag'], target['attribute'], target['value'])
