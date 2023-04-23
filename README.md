# FT- Retrieve Data and Build UI for it

This application was developed in NodeJS and JSX as the client-side

## Exercise: Retrieve the data
Use the [securities quotes api](#using-our-securities-quotes-api) (also known as stock prices) to get the data for the items below 
and output the results in plain HTML.

# Building the Application

Main Application Structure
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
- As part of the requirement to use Origami Component,
I included it in the Main.jsx, via the `link` and `script` tag

`<link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v3/bundles/css?components=o-grid@^6.0.0,o-colors@^6.0.8,o-typography@^7.0.2,o-table@^9.0.2&brand=master&system_code=origami"/>`
`<script src="https://www.ft.com/__origami/service/build/v3/bundles/js?components=o-table@^9.0.2,o-autoinit@^3.0.0&system_code=origami"></script>`
				



## API
The API Endpoint used: https://markets-data-api-proxy.ft.com/research/webservices/securities/v1/quotes
Query Parameter: ?symbols=FTSE:FSI,INX:IOM,EURUSD,GBPUSD,IB.1:IEU
Full API Endpoint is: 
https://markets-data-api-proxy.ft.com/research/webservices/securities/v1/quotes?symbols=FTSE:FSI,INX:IOM,EURUSD,GBPUSD,IB.1:IEU


## To Run the application

As a prerequisite: You need to have [Node.js](https://nodejs.org/en/) 16.x installed and its package manager, [npm](https://www.npmjs.com/)

- Open your terminal
- Navigate to the application directory ([/ft-tech])
- Type `npm install` (if "node_modules" not found), would install the dependencies
- After that, type `npm start` to run the application
- You can open your browser and type `http://localhost:3000/jsx` to see the application

- 
- The application is responsive



## Testing the application

To test the application, the test can be found in the `test` folder , which contains two(2) files 
- app.spec.js (for the api testing)
- main.spec.js (for frontend testing)

You can run test with this command `npm test` in your application console/terminal



Thanks