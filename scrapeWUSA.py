import requests
from bs4 import BeautifulSoup
import pandas

CATEGORIES = [
    'academic',
    'business-and-entrepreneurial',
    'charitable-community-service-international-development',
    'creative-arts-dance-and-music',
    'cultural',
    'environmental-and-sustainability',
    'games-recreational-and-social',
    'health-promotion',
    'media-publications-and-web-development',
    'political-and-social-awareness',
    'religious-and-spiritual'
]


def parseClub(card):
    title = card.find('h4').text.strip()

    descriptionTag = card.find(class_='read-more-text')
    description = '\n\n'.join([tag.text for tag in descriptionTag.find_all('p')])

    return {'title': title, 'description': description}

def getTitle(card):
    title = card.find('h4').text.strip()
    return title

def parseCategory(category):
    url = generatePage(category)

    r = requests.get(url)
    res = r.text

    soup = BeautifulSoup(res, 'html.parser')

    cards = soup.find_all(class_="card")

    clubs = [{'club': getTitle(c), 'category': category } for c in cards]
    
    return clubs

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


def generatePage(val):
    base = 'https://clubs.wusa.ca/club_listings'
    query = '?page='
    return base + query + str(val)

def getAllClubs():
    clubs = []
    for i in range(1, 19):
        clubs = clubs + parsePage(generatePage(i))

    data = pandas.DataFrame(clubs)

    # print(data)
    # data.to_csv('clubList.csv')

    return data

def getCategories():
    categoryMappings = []
    for category in CATEGORIES:
        clubs = parseCategory(category)
        categoryMappings = categoryMappings + clubs
    return categoryMappings


def attributeCategories():
    clubList = getAllClubs()
    categoryMap = getCategories()

pandas.DataFrame(getCategories()).to_csv('categories.csv')
