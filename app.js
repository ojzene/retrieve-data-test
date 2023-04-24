require('sucrase/register'); // subset of babel
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const { engine }  = require('express-handlebars');
const jsxEngine = require('./lib/react-server');

// import a fetch method from library created to retrieve response from api
const fetchAPI = require('./lib/fetch-api');

const app = express();
app.engine('.jsx', jsxEngine);
app.engine('handlebars', engine({layoutsDir: path.join(app.settings.views, 'handlebars', 'layouts')}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.render('start');
});

/*
* FOR JSX TEMPLATING
*/
app.get('/jsx', async (req, res) => {
  // use symbols as params, and api url as a parameter to retrieve security api
  const symbols = ['FTSE:FSI', 'INX:IOM', 'EURUSD', 'GBPUSD', 'IB.1:IEU'];
  const apiUrl = `https://markets-data-api-proxy.ft.com/research/webservices/securities/v1/quotes?symbols=${symbols.join(',')}`;  
  
  // get result using the fetch-api method imported 
  const { data } = await fetchAPI(apiUrl);

  console.log(data);

  const templateData = {
    pageTitle: 'Financial Times',
    content: data
  };
  
  // get response and pass data to build ui template
  res.render('jsx/Main.jsx', templateData);
});
/*
* END JSX TEMPLATING
*/

if(process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
  });
}

// Export the app so that we can test it in `test/app.spec.js`
module.exports = app;
