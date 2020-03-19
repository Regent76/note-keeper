import chai from "chai";
import chaiHttp from "chai-http";
import should from "should";
import { apiTestConfig } from "../../config/test";

chai.use(chaiHttp);

describe("System Controller Test", function() {
  it("GET /v1/swagger is OK", function(done) {
    chai
      .request(apiTestConfig.consts.API_URL)
      .get("/v1/swagger")
      .end((err, res) => {
        (err === null).should.be.true;
        res.status.should.be.equal(200);
        done();
      });
  });
});
