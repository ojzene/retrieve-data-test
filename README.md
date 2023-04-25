# FT - Retrieve Data and Build UI

This application is simply to retrieve FT security quote api and display UI in jsx 

## Application development

- Backend: NodeJS (Express) 
- Frontend/Client-side: JSX
- UI Component: Origami
- Testing: Jest, Supertest

# Building the application

**Core Application Structure**
-   ft-tech
    -   src
        -   css
            -   styles.scss
        -   js
            -   main.js
    -   lib
        -   fetch-api.js
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
    -   webpack.config.js


## Provided API

The API Endpoint used: ```https://markets-data-api-proxy.ft.com/research/webservices/securities/v1/quotes```

Query Parameter: ```?symbols=FTSE:FSI,INX:IOM,EURUSD,GBPUSD,IB.1:IEU```

Full API Endpoint is: ```https://markets-data-api-proxy.ft.com/research/webservices/securities/v1/quotes?symbols=FTSE:FSI,INX:IOM,EURUSD,GBPUSD,IB.1:IEU```

For the API Data retrieval, `node-fetch` (^2.6.6) was implemented, it's the native fetch api for NodeJS and has lesser dependencies.

It was chosen also because implementing test with window.fetch default was error-prone, also easy to implement which makes it best option.

This was imported in the `lib/fetch-api.js` to develop the fetch library, the code snippet can be found below:  

```javascript
const fetch = require("node-fetch");

const fetchAPI = async (apiUrl="") => {
    try {
        if (apiUrl !== '' || apiUrl.length !== 0) {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const result = data;
            return result;
        } 
        throw Error("Please provide url!");
    } catch (error) {
        const { message } = error;
        return { message };
    }
}
module.exports = fetchAPI;
```

## Server Side

In the app.js file, which contains the /jsx route for the api working.

Fetch API library was imported in order to retrieve data to be consumed by the frontend

`const fetchAPI = require('./lib/fetch-api');`

On the route endpoint:

```javascript
app.get('/jsx', async (req, res) => {
  const symbols = ['FTSE:FSI', 'INX:IOM', 'EURUSD', 'GBPUSD', 'IB.1:IEU'];
  const apiUrl = `https://markets-data-api-proxy.ft.com/research/webservices/securities/v1/quotes?symbols=${symbols.join(',')}`;
  const { data } = await fetchAPI(apiUrl);
  const templateData = {
    pageTitle: 'Financial Times',
    content: data
  };
  res.render('jsx/Main.jsx', templateData);
});
```

## Frontend (Client-side) Development

- For Origami Component Usage 

It was used to have the look and feel of `https://ft.com`,

It was included the origami components via npm install as a peer dependencies seen below:

`npm install --save-peer @financial-times/o-grid @financial-times/o-typography @financial-times/o-colors @financial-times/o-spacing`

Placed in the package.json as:

```
"peerDependencies": {
    "@financial-times/o-colors": "^6.4.4",
    "@financial-times/o-fonts": "^5.3.4",
    "@financial-times/o-grid": "^6.1.5",
    "@financial-times/o-spacing": "^3.2.2",
    "@financial-times/o-typography": "^7.3.5"
}
```

The components were being imported in style file (`src/css/styles.scss`) and implemented in the Home Component:

```
$system-code: 'test';
@import '@financial-times/o-grid/main';
@import '@financial-times/o-colors/main';
@import '@financial-times/o-typography/main';
@import '@financial-times/o-spacing/main';
@import '@financial-times/o-fonts/main';

@include oGrid();
@include oColors();
@include oTypography();
@include oSpacing();
@include oFonts();
```

- For Accessibility Criteria
  
To make the application be accessible, `accessibility` (^4.5.6) was implmemented because it's very ease to use, no other dependencies were required (like JQuery).

To install: `npm install accessibility` in the root project in terminal

The accessibility script was placed in src/js/main.js

`import { Accessibility } from 'accessibility/dist/main';`

Included core-js, rengerator-runtime (due of the issue faced as rengerator-runtime wasn't defined):

`npm install --save core-js`

`npm install --save regenerator-runtime`

This was placed at the top of your main js file

`import "core-js/stable";`

`import "regenerator-runtime/runtime";`


- On the Home Component (`views/jsx/Components/Home.jsx`):

Firstly get the props *pageTitle* and *items array* from the backend api and destructed for use

```javascript
	let { pageTitle, content : { items } } = props
	let bodyContent;
```

Next is to check if the items array is empty or not for `error handling`,

if empty then we can display page title as *Oops!* and content *No data provided from API at the moment...*

if array contains necessary data, we declare a content-mapper method `contentMapper` that maps the array items symbol with corresponding name and respective day's percentage change, after this then we can return a styled class based on the value sign, if negative or not, using a method to check `quoteStyle`.

```javascript
    if (items.length <= 0) {
        pageTitle = 'Oops!';
        bodyContent = 'No data provided from API at the moment...'
    } else {
        const mappedBody = contentMapper(items, securityObj);
        bodyContent = mappedBody.map((security, idx) => {
            return (
                <span className="o-text-right o-typography-heading-level-4" key={idx}>
                    <span className="o-colors-white"> {security.name} </span> 
                    <span className={quoteStyle(security.value)}> {security.value} </span>
                </span>
            )
        });
    }
```

Content Mapper Method:

```javascript
const contentMapper = (items, symbolObj) => {
    const mappedList = items.map(symbol => {
        const quoteObj = { name: '', value: '' };
        const security = symbolObj[symbol.symbolInput];
        const percentageChange = security ? symbol.quote.change1DayPercent.toFixed(2) : '';
        quoteObj.name = security;
        quoteObj.value =  `${percentageChange}%`;
        return quoteObj;
    });
    return mappedList;
}
```

Class-style value sign method:

```javascript
const quoteStyle = (value) => {
    return (Math.sign(value.split('%')[0]) >= 0)  ? 'o-colors-positive': 'o-colors-negative';
}
```

After this is done we can properly render the view

Render the view:

```javascript
return (
    <div className="o-grid-container">
        <div className="o-spacing-s8"></div>
        <div className="o-typography-heading-level-1 o-spacing-s6">{pageTitle}</div>
        <div className="o-security-wrapper o-grid-row o-typography-wrapper">
            <div data-o-grid-colspan="2 M12">
                {bodyContent}
            </div>
        </div>
    </div>
);
```


## To Run the application

As a pre-requisite: You need to have [Node.js](https://nodejs.org/en/) 16.x installed and 
its package manager, [npm](https://www.npmjs.com/)

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

The Test can be found in the `test` folder, which contains two(2) files:

-- test/app.spec.js

-- test/main.spec.js

## Testing coverage
**app.spec.js**
- To test the express server and return response as html
- To test provided api when empty params is passed in the url, error returns status 400
- To test if quotes API contain full url endpoint to return proper response
- To test view /jsx page to render proper html
- To check the application endpoint respond with status code 404, if not found

**main.spec.js**
- To test securities object item
- To check the day percentage change for a quote value is positive
- To check the client response symbol input is present

You can run test with this command `npm test` in your application console/terminal.
