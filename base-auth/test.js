import app from './app';
import supertest from 'supertest';
const request = supertest.agent(app.listen());

describe('Koa Basic Auth', () => {
  describe('with no credentials', () => {
    it('should `throw` 401', (done) => {
      request
        .get('/')
        .expect(401, done);
    });
  });

  describe('with invalid credentials', () => {
    it('should `throw` 401', (done) => {
      request
        .get('/')
        .auth('user', 'invalid password')
        .expect(401, done);
    });
  });

  describe('with valid credentials', () => {
    it('should call the next middleware', (done) => {
      request
        .get('/')
        .auth('tj', 'tobi')
        .expect(200)
        .expect('secret', done);
    });
  });
});
