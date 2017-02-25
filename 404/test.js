import app from './app';
import supertest from 'supertest';
const request = supertest.agent(app.listen());

describe('404', () => {
  describe('when GET /', () => {
    it('should return the 404 page', done => {
      request
      .get('/')
      .expect(404)
      .expect(/Page Not Found/);
      done();
    });
  });
});
