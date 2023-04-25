# FT - Retrieve Data and Build UI

This application is simply to retrieve FT security quote api and display UI in jsx 

## Application development
- Backend: NodeJS (Express) 
- Frontend/Client-side: JSX
- UI Component: Origami
- Testing: Jest, Supertest

# Building the Application

*Core Application Structure*
-ft-tech
    -src
        -css
            -styles.scss
        -js
            -main.js
    -lib
        -fetch-api.js
    -app.js
    -jsx
        -Components
            -Home.jsx 
        -Main.jsx
    -test
        -fixtures
            -securities-response.json
        -app.spec.js
        -main.spec.js
    -package.json

## Frontend (Client-side) Bulid

- Origami Component Usage 

It was used to have the look and feel of `https://ft.com`,
It was included the origami components via npm install as a peer dependencies seen below:

`npm install --save-peer @financial-times/o-grid @financial-times/o-typography @financial-times/o-colors @financial-times/o-spacing`

Placed in the package.json as:

`
"peerDependencies": {
    "@financial-times/o-colors": "^6.4.4",
    "@financial-times/o-fonts": "^5.3.4",
    "@financial-times/o-grid": "^6.1.5",
    "@financial-times/o-spacing": "^3.2.2",
    "@financial-times/o-typography": "^7.3.5"
}
`
The components were being imported in style file (src/css/styles.scss) and implemented in the Home Component:

[$system-code: 'test';
@import '@financial-times/o-grid/main';
@import '@financial-times/o-colors/main';
@import '@financial-times/o-typography/main';
@import '@financial-times/o-spacing/main';
@import '@financial-times/o-fonts/main';

@include oGrid();
@include oColors();
@include oTypography();
@include oSpacing();
@include oFonts();]


## For Accessibility
To make the page accessible, the accessibility library was included from `https://www.npmjs.com/package/accessibility`
Installation was done: `npm install accessibility`

The accessibility script was placed in src/js/main.js

`import { Accessibility } from 'accessibility/dist/main';`

Included core-js, rengerator-runtime (due of the issue faced as rengerator-runtime wasn't defined):

npm install --save core-js
npm install --save regenerator-runtime

This was placed at the top of your main js file

import "core-js/stable";
import "regenerator-runtime/runtime";

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
- You can navigate to `http://localhost:3000/jsx` to view the project
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
1. To test securities object item
2. To check the day percentage change for a quote value is positive
3. To check the day percentage change for a quote value is negative


You can run test with this command `npm test` in your application console/terminal.

Thanks