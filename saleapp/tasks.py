
import imaplib
import email
import yaml 
import requests
import openai
from celery import shared_task
from scrapy.crawler import CrawlerRunner
from twisted.internet import defer, reactor
from salescraper.spiders.brand_spider import BrandSpider 
from scrapy.utils.project import get_project_settings
from scrapy.settings import Settings
from salescraper import settings as scrapy_settings
import logging
logging.basicConfig(level=logging.DEBUG)

#potentiele errors omdat ik emails.py naar tasks.py heb veranderd

@shared_task
def getmail():
    
    print("executed task")

    with open("credentials.yml") as f:
        content = f.read()
        
    my_credentials = yaml.load(content, Loader=yaml.FullLoader)

    #Load the user name and passwd from yaml file
    user, password = my_credentials["user"], my_credentials["password"]

    #URL for IMAP connection
    imap_url = 'imap.gmail.com'
    # Connection with GMAIL using SSL
    my_mail = imaplib.IMAP4_SSL(imap_url)
    # Log in using your credentials
    my_mail.login(user, password)
    # Select the Inbox to fetch messages
    my_mail.select('Inbox')
    #Define Key and Value for email search
    #For other keys (criteria): https://gist.github.com/martinrusev/6121028#file-imap-search
    key = 'FROM'
    value = 'tammodewilde@gmail.com'
    _, data = my_mail.search(None, key, value)  #Search for emails with specific key and value

    mail_id_list = data[0].split()  #IDs of all emails that we want to fetch 

    msgs = [] # empty list to capture all messages
    #Iterate through messages and extract data into the msgs list
    for num in mail_id_list:
        typ, data = my_mail.fetch(num, '(RFC822)') #RFC822 returns whole message (BODY fetches just body)
        msgs.append(data)

    for msg in msgs[::-1]:
        for response_part in msg:
            if type(response_part) is tuple:
                my_msg=email.message_from_bytes((response_part[1]))
                # print("_________________________________________")
                # print ("subj:", my_msg['subject'])
                # print ("from:", my_msg['from'])
                # print ("body:")
                for part in my_msg.walk():  
                    #print(part.get_content_type())
                    if part.get_content_type() == 'text/plain':
                        # print(part.get_payload())
                        return part.get_payload()
    return 0



#scraper


def start_crawl(url, tag, attribute, value):
    runner = CrawlerRunner(get_project_settings())
    spider = BrandSpider  # Pass the spider class, not an instance

    # Update the settings with the custom arguments for the spider
    spider.custom_settings = {
        'start_urls': [url],
        'scraping_tag': tag,
        'scraping_attribute': attribute,
        'scraping_value': value,
    }

    crawl_deferred = runner.crawl(spider)
    return {'result': 'success'}  # or {'result': 'failure'}, based on your logic

@shared_task
def scrape_task(url, tag, attribute, value):
    # Start the crawl using the start_crawl function
    sale_found = start_crawl(url, tag, attribute, value)
    return sale_found

