'use strict';

// const serverMod = require('../lib/server');
// const server = serverMod.server;

const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);
let newRecord = {
  name: 'test name',
  display_name: 'display test',
  description: 'describtion test',
  category: 'category test',
};
let categoryRecord = {
  name: 'test name',
  display_name: 'display test',
  description: 'describtion test',
};

describe('the server', () => {
  it('get /products rout will retrev data from db', () => {
    return mockRequest
      .post('/api/v1/products')
      .send(newRecord)
      .then(date => {
        return mockRequest
          .get('/api/v1/products')
          .then(record => {
            Object.keys(newRecord).forEach(key => {
              expect(record.status).toBe(200);
              expect(record.body[0][key]).toStrictEqual(newRecord[key]);
            });
          });
      });
  });
  it('handle status (404)', () => {
    return mockRequest
      .get('/unvalidrout').then(results => {
        expect(results.status).toBe(404);
      });
  });
  it('POST /products route will send body', () => {
    return mockRequest
      .post('/api/v1/products')
      .send(newRecord)
      .then(results => {
        Object.keys(newRecord).forEach(key => {
          expect(results.status).toBe(201);
          expect(results.body[key]).toStrictEqual(newRecord[key]);
        });
      });
  });
  it('handle status 500', () => {
    let unValidRecord = {
      name: 'test statuse 500',
    };
    return mockRequest
      .post('/api/v1/products')
      .send(unValidRecord)
      .then(data => {
        expect(data.status).toBe(500);
      });
  });
  it('get /category rout will retrev data from db', () => {
    return mockRequest
      .post('/api/v1/category')
      .send(categoryRecord)
      .then(date => {
        return mockRequest
          .get('/api/v1/category')
          .then(record => {
            Object.keys(categoryRecord).forEach(key => {
              expect(record.status).toBe(200);
              expect(record.body[0][key]).toStrictEqual(categoryRecord[key]);
            });
          });
      });
  });
  it('POST /category route will send body', () => {
    return mockRequest
      .post('/api/v1/category')
      .send(categoryRecord)
      .then(results => {
        Object.keys(categoryRecord).forEach(key => {
          expect(results.status).toBe(201);
          expect(results.body[key]).toStrictEqual(categoryRecord[key]);
        });
      });
  });
  it('handle status 500', () => {
    let unValidRecord = {
      name: 'test statuse 500',
    };
    return mockRequest
      .post('/api/v1/category')
      .send(unValidRecord)
      .then(data => {
        expect(data.status).toBe(500);
        expect(data.text).toEqual('"category validation failed: description: Path `description` is required., display_name: Path `display_name` is required."');
      });
  });
});