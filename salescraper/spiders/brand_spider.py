import scrapy
import re

class BrandSpider(scrapy.Spider):
    name = 'brand_spider'
    tag = 'body'
    attribute = None
    pattern = None
    sale_found = False

    def parse(self, response):
        sale_elements = response.xpath('//*[contains(translate(descendant-or-self::text(), "SALE", "sale"), "sale")]/descendant-or-self::text()').getall()

        if sale_elements:
            sale_status = True
            sale_info = " | ".join([element.strip() for element in sale_elements])
        else:
            sale_status = False
            sale_info = "No sale found"

        xpath_selector = f"//{self.tag}"
        if self.attribute:
            xpath_selector += f"[@{self.attribute}='{self.pattern.pattern}']"
        else:
            xpath_selector += f"//*"

        for element in response.xpath(xpath_selector):
            texts = element.xpath('.//text()').getall()
            for text in texts:
                text_lower = text.lower()
                print(f"Looking in element: {text.strip()}")
            if self.pattern.search(text_lower):
                print(f"Found matching text: {text.strip()}")
                self.sale_found = True
                break
        if self.sale_found:
            yield {
                'url': response.url,
                'text': text,
                'sale_status': sale_status,
                'sale_info': sale_info,
                'sale': self.sale_found,
            }