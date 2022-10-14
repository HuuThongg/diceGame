import requests
from bs4 import BeautifulSoup
import re
import json
# from requests_html import HTMLSession

URL = "https://www.imdb.com/chart/top"
page = requests.get(URL)
soup = BeautifulSoup(page.content,'html.parser')
links = []
for atag in soup.select('td.titleColumn a'):
    links.append("https://www.imdb.com"+atag['href']) 
demolink = 'https://www.imdb.com/title/tt0068646'
def getData(URL):
    page = requests.get(URL)
    soup = BeautifulSoup(page.content,'html.parser')
    script = soup.findAll('script')[1].string
    genre = re.findall('"genre":(\[".*"\]),',script,re.S)[0]
    image = re.findall('"image":"(.*\.jpg)","description',script,re.S)[0]
    genre = genre.strip('[').strip(']').replace('"','').split(',')
    title = (soup.findAll('h1', {'data-testid':'hero-title-block__title'})[0]).get_text()
    desc = (soup.findAll('span', {'data-testid':'plot-xs_to_m'})[0]).get_text()
    rating = float((soup.findAll('span', {'class':'sc-7ab21ed2-1 jGRxWM'})[0]).get_text())
    a_stars = [star.get_text() for star in (soup.find('a',string='Stars')).next_sibling.findAll('a')]
    director = re.findall('"director":.*,"name":"(.*)"}],"creator',script,re.S)[0]
    date = re.findall('"datePublished":"(\d{4}-\d{2}-\d{2})"',script,re.S)[0]
    # print(title, desc, rating, genre, a_stars, director, image, date, sep="\n")
    return {
        'title':title,
        'description':desc,
        'rating':rating,
        'genre':genre,
        'actors':a_stars,
        'director':director,
        'imageURL':image,
        'dateRelease':date
    }
data = []
# print(getData(demolink))
for link in links:
    data.append(getData(link))

json_object = json.dumps(data, indent=4)
 
# Writing to sample.json
with open("sample.json", "w") as outfile:
    outfile.write(json_object)
