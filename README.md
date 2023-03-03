# MSCI 342 Project
## UW Club Hub app
A hub for the student clubs at the University of Waterloo.

Find clubs, join clubs, view announcements, keep up to date!

Home <br/>
<img height="360px" src="https://user-images.githubusercontent.com/90345689/222816727-60b42b67-648f-4964-881e-d160bbbe3831.png"/>

Explore  - Search for clubs and sort by category<br/>
<img height="360px" src="https://user-images.githubusercontent.com/90345689/222816744-f74be72c-259f-4a98-a69a-8081207a6a4f.png"/>

Club Details Page - View club info <br/>
<img height="360px" src="https://user-images.githubusercontent.com/90345689/222817004-75965233-b2fc-475d-9b54-3f28bf15c12e.png"/>

My Clubs - View clubs your joined clubs <br/>
<img height="360px" src="https://user-images.githubusercontent.com/90345689/222816792-e4e84b70-54d6-4b1b-a0ac-e975a5306562.png"/>

Club Member Board - View club announcements and other club info  <br/>
<img height="360px" src="https://user-images.githubusercontent.com/90345689/222816754-29bfed6e-47a2-4665-ac33-2c23f9136d44.png"/>




## Installation

**Service account key for Firebase app needs to be in node-react-app/serviceAccountKey**


To clone this repository run 
`git clone https://github.com/aniqp/msci-342-project`

To install npm packages for the project:
```
cd node-react-app
npm i --force --legacy-peer-deps
cd client
npm i --force --legacy-peer-deps
```

before running:

Set the MySQL info in node-react-app/config.js

Set the serverURL in node-react-app/client/src/constants/config.js

Set firebase config info in node-react-app/client/src/components/Firebase/firebase.js

**Service account key for Firebase app needs to be in node-react-app/serviceAccountKey**

To run, from *node-rect-app* directory run

dev mode:
`npm run dev`

deployment: 
`npm start`
