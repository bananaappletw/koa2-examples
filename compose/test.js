const app = require('./app');
const request = require('supertest').agent(app.listen());

describe('Compose', () => {
  describe('when GET /', () => {
    it('should say "Hello World"', done => {
      request
        .get('/')
        .expect(200)
        .expect('Hello World', done);
    });

    it('should set X-Response-Time', done => {
      request
        .get('/')
        .expect('X-Response-Time', /ms$/)
        .expect(200, done);
    });
  });

  describe('when not GET /', () => {
    it('should 404', done => {
      request
        .get('/aklsjdf')
        .expect(404, done);
    });
  });
});
