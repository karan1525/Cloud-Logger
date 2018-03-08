const request = require('supertest');
const app = require('../index.js')


describe('Test the test path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/status200ok').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});


describe('Test the test path', () => {
    test('It should response the POST method with 404 not found', (done) => {
        request(app).post('/status200ok').then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });
});
