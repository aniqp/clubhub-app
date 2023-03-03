# MSCI 342 Project
## UW Club Hub app



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
