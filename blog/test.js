const app = require('./app');
const request = require('supertest').agent(app.listen());

describe('Blog', () => {
  describe('GET /', () => {
    it('should see title "Posts"', done => {
      request
      .get('/')
      .expect(200, (err, res) => {
        if (err) return done(err);

        res.should.be.html;
        res.text.should.include('<title>Posts</title>');
        done();
      });
    });
    it('should see 0 post', done => {
      request
      .get('/')
      .expect(200, (err, res) => {
        if (err) return done(err);

        res.should.be.html;
        res.text.should.include('<p>You have <strong>0</strong> posts!</p>');
        done();
      });
    });
  });
  describe('POST /post/new', () => {
    it('should create post and redirect to /', done => {
      request
      .post('/post')
      .send({title: 'Title', body: 'Contents'})
      .end((err, res) => {
        if (err) return done(err);

        res.header.location.should.be.equal('/');
        done();
      });
    });
  });
  describe('GET /post/0', () => {
    it('should see post', done => {
      request
      .get('/post/0')
      .expect(200, (err, res) => {
        if (err) return done(err);

        res.should.be.html;
        res.text.should.include('<h1>Title</h1>');
        res.text.should.include('<p>Contents</p>');
        done();
      });
    });
  });
});
