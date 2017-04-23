const app = require('./app');
const request = require('supertest').agent(app.listen());

let token;
let cookie;

describe('csrf', () => {
  describe('GET /token', () => {
    it('should get token', (done) => {
      request
        .get('/token')
        .expect(200)
        .end((err, res) => {
          token = res.text;
          token.should.be.String;
          cookie = res.headers['set-cookie'].join(';');
          done(err);
        });
    });
  });

  describe('POST /post', () => {
    it('should 403 without token', (done) => {
      request
        .post('/post')
        .send({foo: 'bar'})
        .expect(403);
      done();
    });

    it('should 403 with wrong token', (done) => {
      request
        .post('/post')
        .send({foo: 'bar'})
        .set('x-csrf-token', 'wrong token')
        .expect(403);
      done();
    });

    it('should 200 with token in head', (done) => {
      request
        .post('/post')
        .set('Cookie', cookie)
        .set('x-csrf-token', token)
        .send({foo: 'bar'})
        .expect(200);
      done();
    });

    it('should 200 with token in body', (done) => {
      request
        .post('/post')
        .set('Cookie', cookie)
        .send({_csrf: token})
        .expect(200);
      done();
    });
  });
});
