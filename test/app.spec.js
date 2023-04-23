const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

const testApi = 'https://markets-data-api-proxy.ft.com';
const endpoint = '/research/webservices/securities/v1/quotes';
const fullEndpoint = '/research/webservices/securities/v1/quotes?symbols=FTSE:FSI,INX:IOM,EURUSD,GBPUSD';

describe('Testing the server', () => {
	it('can run the express server and return a 200', async () => {
		const response = await request.get('/');
		expect(response.statusCode).toBe(200);
		expect(response.header['content-type']).toBe('text/html; charset=utf-8'); 
	});
});

// Testing the security API
describe('Testing the API Provided', () => {
	it('tests for when empty params is passed, error returns status 400', async () => {
		const response = await supertest(testApi).get(endpoint);
		expect(response.statusCode).toEqual(400);
		expect(response.header['content-type']).toBe('application/json; charset=utf-8');
		expect(response.body).toHaveProperty('error');
		expect(response.body).toHaveProperty('timeGenerated');
	});

	it('if Quotes API contain params return status 200', async () => {
		const response = await supertest(testApi).get(fullEndpoint);
		expect(response.statusCode).toBe(200);
		expect(response.header['content-type']).toBe('application/json; charset=utf-8');
		expect(response.body).toHaveProperty('data');
	});
});

describe('Test the jsx endpoint', () => {
	it('GET /jsx should render proper html', async () => {
		const response = await request.get('/jsx');
		expect(response.type).toEqual('text/html');
	});
});

describe('Check invalid endpoint', () => {
	it('should respond with status code 404 if resource is not found', async () => {
		const res = await request.get('/blah');
		expect(res.statusCode).toEqual(404);
	});
})

