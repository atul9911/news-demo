import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.should();
chai.use(chaiHttp);

/* Test the /GET route */
describe('app index route', () => {
  it('it should GET /', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should handle 404 error', (done) => {
    chai.request(app)
      .get('/notExist')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('it should return 200', (done) => {
    chai.request(app)
      .get('/news?category=sports&country=us')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should make request from cache', (done) => {
    chai.request(app)
      .get('/news?category=sports&country=us')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should return 400', (done) => {
    chai.request(app)
      .get('/news?category=sports')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should return 400', (done) => {
    chai.request(app)
      .get('/news')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should return 400', (done) => {
    chai.request(app)
      .get('/news?country=us')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
