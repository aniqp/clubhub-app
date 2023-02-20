import requests
from bs4 import BeautifulSoup
import pandas


def parseClub(card):
    title = card.find('h4').text.strip()

    descriptionTag = card.find(class_='read-more-text')
    description = '\n\n'.join([tag.text for tag in descriptionTag.find_all('p')])

    return {'title': title, 'description': description}



def parsePage(url):
    r = requests.get(url)
    res = r.text

    soup = BeautifulSoup(res, 'html.parser')

    # find all .card
    # for each:
    #   Get title <h4> title <h4>
    #   Get all .read-more-text <p>s
    #   <p>s are separated by newline, \n\n

    cards = soup.find_all(class_="card")

    clubs = [parseClub(c) for c in cards]

    return clubs


def generatePage(num: int) -> str:
    base = 'https://clubs.wusa.ca/club_listings'
    query = '?page='
    return base + query + str(num)



clubs = []
for i in range(1, 19):
    clubs = clubs + parsePage(generatePage(i))

data = pandas.DataFrame(clubs)

print(data)

data.to_csv('clubList.csv')