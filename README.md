# MSCI 342: UW Club Hub App

**App Description:** A hub for the student clubs at the University of Waterloo. Find clubs, join clubs, view announcements, keep up to date!

*Designed and developed by: Aniq Premji, Fraser Morrison, Larissa Troper, Ryan Hu*

## Installation Instructions

To clone this repository run 
`git clone https://github.com/aniqp/msci-342-project`

To install npm packages for the project:
```
cd node-react-app
npm i --force --legacy-peer-deps
cd client
npm i --force --legacy-peer-deps
```

Before running:

* Set the MySQL info in node-react-app/config.js

* Set the serverURL in node-react-app/client/src/constants/config.js

* Set firebase config info in node-react-app/client/src/components/Firebase/firebase.js

**IMPORTANT: Service account key for Firebase app needs to be in the node-react-app directory**

To start the application, run the following command in the *node-react-app* directory:

* Dev mode:
`npm run dev`

* Deployment: 
`npm start`
<br />

## Sprint 1 - Product Demo
### Breakdown of Pages in App with Screenshots:


App Pages | Description/Functionality
------------- | -------------
Landing page | Users are directed upon first rendering of the application.
Explore page | Users can access the list of all available clubs at University of Waterloo, join clubs, and access a club’s Detailed Club page
Detailed Club page | Users can access a club’s full description and photos
My Clubs page | Users can access the list of all clubs they are a member in and club members can access a club’s Club Board page
Club Board page | Club members can view a club’s announcement posts and information regarding other club members. Additionally, Club admins and club owner can post, edit or delete announcements for their club

  <br />
  <br />
  <br />
  
App Pages | Screenshot of Page
------------- | -------------
Landing page | <img width="1440" alt="Screen Shot 2023-03-03 at 3 31 28 PM" src="https://user-images.githubusercontent.com/72565412/222830761-9e907ab7-4da5-4705-88f9-d4d1373310d5.png">
Explore page | <img width="1440" alt="Screen Shot 2023-03-03 at 3 35 33 PM" src="https://user-images.githubusercontent.com/72565412/222830804-027f1aa6-4352-4fc8-8fb5-ea089a98a48f.png">
Detailed Club page | <img width="1440" alt="Screen Shot 2023-03-03 at 4 16 08 PM" src="https://user-images.githubusercontent.com/72565412/222830907-f9631457-c425-4218-8a1e-44f2d9d10f87.png">
My Clubs page | <img width="1440" alt="Screen Shot 2023-03-03 at 3 35 43 PM" src="https://user-images.githubusercontent.com/72565412/222830926-8205c45e-5ab7-4260-b3bc-c495ca2dd043.png">
Club Board page  <br /> (**POV:Admin/Club Owner**) | <img width="1440" alt="Screen Shot 2023-03-03 at 3 35 58 PM" src="https://user-images.githubusercontent.com/72565412/222830985-b05f1a96-1cf0-4f06-b95e-24e2cafbe144.png">
Club Board page  <br /> (**POV: Club Member**) | <img width="1440" alt="Screen Shot 2023-03-03 at 3 36 31 PM" src="https://user-images.githubusercontent.com/72565412/222831018-7905809d-b111-4937-ab8c-aa2bb3883a7b.png">

## Sprint 2 - Product Demo

### Breakdown of Pages in App with Screenshots

App Pages | Description/Functionality
------------- | -------------
Landing page | Users are directed upon first rendering of the application.
Explore page | Users can access the list of all available clubs at University of Waterloo, join clubs, and access a club’s Detailed Club page
Detailed Club page | Users can access a club’s full description and photos
My Clubs page | Users can access the list of all clubs they are a member in and club members can access a club’s Club Board page
Club Board page | Club members can view a club’s announcement posts and information regarding other club members. Additionally, Club admins and club owner can post, edit or delete announcements for their club

  <br />
  <br />
  <br />
  
App Pages | Screenshot of Page
------------- | -------------
Landing page | <img width="1440" alt="Screen Shot 2023-03-03 at 3 31 28 PM" src="https://user-images.githubusercontent.com/72565412/222830761-9e907ab7-4da5-4705-88f9-d4d1373310d5.png">
Dashboard page | <img width="946" alt="image" src="https://user-images.githubusercontent.com/89875233/228154963-6dbcdd99-a7f7-4b4b-b501-8440e88b8ef9.png">
Explore page | <img width="1440" alt="Screen Shot 2023-03-03 at 3 35 33 PM" src="https://user-images.githubusercontent.com/72565412/222830804-027f1aa6-4352-4fc8-8fb5-ea089a98a48f.png">
Detailed Club page | <img width="790" alt="image" src="https://user-images.githubusercontent.com/89875233/228155125-191407de-dc12-4b8f-8bfc-d12a51b84e39.png">
My Clubs page | <img width="940" alt="image" src="https://user-images.githubusercontent.com/89875233/228155236-f1545859-1928-4a6b-bab7-236473749bc4.png">
Announcements page on Club board | <img width="936" alt="image" src="https://user-images.githubusercontent.com/89875233/228155365-73093dff-ebe1-467d-a83a-461287378d63.png">
Events page on Club board | <img width="948" alt="image" src="https://user-images.githubusercontent.com/89875233/228155700-ab913930-ff40-4dfc-bcb6-0d76fab50f83.png">
Members page on Club board | <img width="953" alt="image" src="https://user-images.githubusercontent.com/89875233/228155776-f59f86c7-86b9-48ee-acde-f951f2f761dd.png">
Photos page on Club board | <img width="950" alt="image" src="https://user-images.githubusercontent.com/89875233/228155823-34eba743-ff01-4660-9011-58f232a3cbc4.png">


