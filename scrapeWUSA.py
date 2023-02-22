import requests
from bs4 import BeautifulSoup
import pandas
import csv

CATEGORIES = [
    ('academic', 5),
    ('business-and-entrepreneurial', 2),
    ('charitable-community-service-international-development', 4),
    ('creative-arts-dance-and-music', 4),
    ('cultural', 5),
    ('environmental-and-sustainability', 1),
    ('games-recreational-and-social', 6),
    ('health-promotion', 3),
    ('media-publications-and-web-development', 2),
    ('political-and-social-awareness', 3),
    ('religious-and-spiritual', 2)
]


def parseClub(card):
    title = card.find('h4').text.strip()

    descriptionTag = card.find(class_='read-more-text')
    description = '\n\n'.join([tag.text for tag in descriptionTag.find_all('p')])

    return {'name': title, 'categories': '', 'description': description}

def getTitle(card):
    title = card.find('h4').text.strip()
    return title

def parseCategory(category):
    clubs = []
    for i in range(1, category[1] + 1):
        url = f"https://clubs.wusa.ca/club_listings/{category[0]}?page={str(i)}"
        print(url)
        r = requests.get(url)
        res = r.text

        soup = BeautifulSoup(res, 'html.parser')

        cards = soup.find_all(class_="card")

        newClubs = [{'club': getTitle(c), 'category': category[0] } for c in cards]
        print(newClubs)
        clubs = clubs + newClubs
    
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

    return clubs

def getCategories():
    categoryMappings = []
    for category in CATEGORIES:
        clubs = parseCategory(category)
        categoryMappings = categoryMappings + clubs
    return categoryMappings


def attributeCategories():
    clubList = getAllClubs()
    categoryMap = getCategories()

def mapCategoriesToList():
    data = getCategories()
    results = {}        
    for entry in data:
        if entry['club'] in results:
            results[entry['club']] = results.get(entry['club']) + f",{entry['category']}"
        else:
            results[entry['club']] = f"{entry['category']}"
    
    clubList = getAllClubs()
    for club in clubList:
        if club['name'] in results:
            club['categories'] = results[club['name']]
    
    pandas.DataFrame(clubList).to_csv('clublist.csv', index=False, quotechar='"', header=None, quoting=csv.QUOTE_NONNUMERIC)

    
    mapList = [{'club': k, 'categories': v} for k, v in results.items()]
    return mapList
            
        

pandas.DataFrame(mapCategoriesToList()).to_csv('categoryMap.csv')
# pandas.DataFrame(getCategories()).to_csv('categories.csv')
