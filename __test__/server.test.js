'use strict';

// const serverMod = require('../lib/server');
// const server = serverMod.server;

const { server } = require('../lib/server');
const supertest = require('supertest');

const mockRequest = supertest(server);

describe('the server', () => {
  it('handle status (404)', () => {
    return mockRequest
      .get('/unvalidrout').then(results => {
        expect(results.status).toBe(404);
      });
  });
  it('handle status (200) of /products route', () => {
    return mockRequest
      .get('/products').then(results => {
        expect(results.status).toBe(200);
      });
  });
  it('POST /products route will send body', () => {

    let newRecord = {
      name: 'test name',
      display_name: 'display test',
      description: 'describtion test',
      category: 'category test',
      id: 1,
    };
    return mockRequest
      .post('/products')
      .send(newRecord)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body).toStrictEqual(newRecord);
      });
  });
  it('handle status (200) of /products route and get product by id', () => {
    let arr = [{
      name: 'test name',
      display_name: 'display test',
      description: 'describtion test',
      category: 'category test',
      id: 1,
    }];
    return mockRequest
      .get('/products/1').then(results => {
        expect(results.status).toBe(200);
        expect(results.body).toStrictEqual(arr);
      });
  });
  it('handle status (200) of /products route and update product by id', () => {
    let updatedRecord = {
      name: 'test update name',
      display_name: 'display test',
      description: 'describtion test',
      category: 'category test',
      id: '1',
    };
    return mockRequest
      .put('/products/1')
      .send(updatedRecord)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body).toStrictEqual(updatedRecord);
      });
  });
  it('handle status (200) of /products route', () => {
    return mockRequest
      .delete('/products/1').then(results => {
        expect(results.status).toBe(200);
      });
  });
  it('POST /categories route will send body', () => {

    let newRecord = {
      name: 'test name',
      display_name: 'display test',
      description: 'describtion test',
      id: 1,
    };
    return mockRequest
      .post('/categories')
      .send(newRecord)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body).toStrictEqual(newRecord);
      });
  });
  it('handle status (200) of /categories route', () => {
    return mockRequest
      .get('/categories').then(results => {
        expect(results.status).toBe(200);
      });
  });
  it('handle status (200) of /categories route', () => {
    let arr = [{
      name: 'test name',
      display_name: 'display test',
      description: 'describtion test',
      id: 1,
    }];
    return mockRequest
      .get('/categories/1').then(results => {
        expect(results.status).toBe(200);
        expect(results.body).toStrictEqual(arr);
      });
  });
  it('handle status (200) of /categories route', () => {
    let updatedRecord = {
      name: 'test update name',
      display_name: 'display test',
      description: 'describtion test',
      id: '1',
    };
    return mockRequest
      .put('/categories/1')
      .send(updatedRecord)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body).toStrictEqual(updatedRecord);
      });
  });
  it('handle status (200) of /categories route', () => {
    return mockRequest
      .delete('/categories/1').then(results => {
        expect(results.status).toBe(200);
      });
  });

});