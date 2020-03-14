import chai from 'chai';
import chaiHttp from 'chai-http';
import should from 'should';
import { apiTestConfig } from '../../config/test';

chai.use(chaiHttp);

describe('Health Check Controller Test', function() {
  it('GET /v1/ping/health is OK', function(done) {
    chai
      .request(apiTestConfig.consts.API_URL)
      .get('/v1/ping/health')
      .end(function(err, res) {
        (err === null).should.be.true;
        res.status.should.be.equal(200);
        res.body.should.have.property('test', 'ok');
        done();
      });
  });
});
