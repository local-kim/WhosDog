import os, sys
from urllib.request import urlopen
from selenium import webdriver
import pymysql

# connect to database
conn = pymysql.connect(
    user="root",
    password="1234",
    host="localhost",
    database="whosdog")
cur = conn.cursor()

driver = webdriver.Chrome()
base_url = 'https://www.animal.go.kr/front/awtis/loss/lossList.do?pageSize=10&menuNo=1000000057&&page='
path = '../client/public/Images/Crawling2/'
page_end = 20
page_size = 10

for page in range(5, page_end + 1):
    for n in range(1, page_size + 1):   # click
        # end of list
        try:
            driver.get(base_url + str(page))
            driver.find_element_by_css_selector('ul.list > li:nth-child(' + str(n) + ') > div.photo > a').click()
        except:
            driver.quit()
            conn.commit()
            conn.close()
            sys.exit(1)

        # no image -> skip
        try:
            img_url = driver.find_element_by_css_selector('div > div.photo > a > img').get_attribute('src')
        except:
            continue

        value = driver.find_element_by_css_selector('input#seqNo').get_attribute('value')
        location = driver.find_element_by_css_selector('div > table > tbody > tr:nth-child(8) > td').text
        date = driver.find_element_by_css_selector('div > table > tbody > tr:nth-child(6) > td').text
        page_url = driver.current_url

        file_name = 'lost_' + value +'.jpg'

        # check if the file already exists
        if os.path.exists(path + file_name):
            continue

        # insert data to DB
        try:
            cur.execute("INSERT INTO losts VALUES (%s, %s, %s, %s)", (file_name, page_url, location, date))
        except pymysql.Error as e:
            print(f"Error: {e}")

        # download images
        with urlopen(img_url) as f:
            with open(path + file_name,'wb') as h:
                img = f.read()
                h.write(img)

print('Download complete')

driver.quit()
conn.commit()
conn.close()