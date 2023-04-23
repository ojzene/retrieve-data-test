# FT - Retrieve Data and Build UI

This application is simply to retrieve FT security quote api and display UI in jsx 

## Application development
- Backend: NodeJS (Express) 
- Frontend/Client-side: JSX
- UI Component: Origami
- Testing: Jest, Supertest

# Building the Application

** Core Application Structure **
 -  ft-tech
    -   src
        -   css
            -   styles.scss
        -   js
            -   main.js
    -   app.js
    -   jsx
        -   Components
            -   Home.jsx 
        -   Main.jsx
    -   test
        -   fixtures
            -   securities-response.json
        -   app.spec.js
        -   main.spec.js
    -   package.json

## Frontend (Client-side) Bulid
- Origami Component was used to have the look and feel of `https://ft.com`,
It was included externally in the Main.jsx `head` tag as seen below:

`<link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v3/bundles/css?components=o-grid@^6.0.0,o-colors@^6.0.8,o-typography@^7.0.2,o-table@^9.0.2&brand=master&system_code=origami"/>`

`<script src="https://www.ft.com/__origami/service/build/v3/bundles/js?components=o-table@^9.0.2,o-autoinit@^3.0.0&system_code=origami"></script>`
				

## API

The API Endpoint used: https://markets-data-api-proxy.ft.com/research/webservices/securities/v1/quotes

Query Parameter: ?symbols=FTSE:FSI,INX:IOM,EURUSD,GBPUSD,IB.1:IEU

Full API Endpoint is: https://markets-data-api-proxy.ft.com/research/webservices/securities/v1/quotes?symbols=FTSE:FSI,INX:IOM,EURUSD,GBPUSD,IB.1:IEU


## To Run the application

As a prerequisite: You need to have [Node.js](https://nodejs.org/en/) 16.x installed and its package manager, [npm](https://www.npmjs.com/)

- Open your terminal
- Navigate to the application directory ([/ft-tech])
- Type `npm install` (if "node_modules" not found), would install the dependencies
- After that, type `npm start` to run the application
- The application would be running on `http://localhost:3000` on the browser
- You can navigate to `http://localhost:3000/jsx` to see the project
- The application is responsive and also,
- The application could be progressively enhanced by adding/extending custom components 

# Testing the application
Jest and Supertest was used to do unit testing on the application

To test the application, the test can be found in the `test` folder , which contains two(2) files 
- app.spec.js (for the api testing)
- main.spec.js (for frontend testing)

## Testing coverage
[app.spec.js]
1. To test provided api when empty params is passed in the url, error returns status 400
2. To test if quotes API contain full url endpoint to return proper response
3. To test view /jsx page to render proper html
4. To check the application endpoint respond with status code 404, if not found

[main.spec.js]
1. To test the component provided

You can run test with this command `npm test` in your application console/terminal.

Thanks