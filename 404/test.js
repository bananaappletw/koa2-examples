import app from './app';
import supertest from 'supertest';
const request = supertest.agent(app.listen());

describe('404', () => {
  it('when GET / should return the 404 page', () => {
      return request
      .get('/')
      .expect(404)
      .expect(/Page Not Found/);
  });
});
