import app from './app';
import supertest from 'supertest';
const request = supertest.agent(app.listen());

describe('Body Parsing', () => {
  describe('POST /uppercase', () => {
    describe('with JSON', () => {
      it('should work', done => {
        request
        .post('/uppercase')
        .send({ name: 'tobi' })
        .expect(200)
        .expect({ name: 'TOBI' }, done);
      });
    });

    describe('with urlencoded', () => {
      it('should work', done => {
        request
        .post('/uppercase')
        .send('name=tj')
        .expect(200)
        .expect({ name: 'TJ' }, done);
      });
    });

    describe('when length > limit', () => {
      it('should 413', done => {
        request
        .post('/json')
        .send({ name: Array(5000).join('a') })
        .expect(413, done);
      });
    });

    describe('when no name is sent', () => {
      it('should 400', done => {
        request
        .post('/uppsercase')
        .send('age=10')
        .expect(400, done);
      });
    });
  });
});
