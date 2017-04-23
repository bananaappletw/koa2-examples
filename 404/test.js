const app = require('./app');
const request = require('supertest').agent(app.listen());
describe('404', () => {
  it('when GET / should return the 404 page', () => {
      return request
      .get('/')
      .expect(404)
      .expect(/Page Not Found/);
  });
});
