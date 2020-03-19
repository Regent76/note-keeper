import chai from "chai";
import chaiHttp from "chai-http";
import should from "should";
import Note from "../../models/Note";
import { apiTestConfig } from "../../config/test";

chai.use(chaiHttp);

describe("Note Controller Test", async function() {
  before(async function() {
    await Note.deleteMany();
    const note = new Note({
      _id: apiTestConfig.consts.NOTE_ID,
      created_by: apiTestConfig.consts.PROFILE_ID1,
      owner: apiTestConfig.consts.PROFILE_ID1
    });
    return await note.save();
  });

  it("PUT /v1/notes/:note_id is OK", function(done) {
    const message = "Test note message";
    chai
      .request(apiTestConfig.consts.API_URL)
      .put("/v1/notes/" + apiTestConfig.consts.NOTE_ID)
      .send({
        message: message
      })
      .set("Authorization", "Bearer " + apiTestConfig.consts.JWT1)
      .end(function(err, res) {
        (err === null).should.be.true;
        res.status.should.be.equal(200);
        res.body.should.have.property("_id");
        res.body.should.have.property("message", message);
        done();
      });
  });

  it("GET /v1/notes is OK (code: 200)", function(done) {
    chai
      .request(apiTestConfig.consts.API_URL)
      .get("/v1/notes")
      .set("Authorization", "Bearer " + apiTestConfig.consts.JWT1)
      .end((err, res) => {
        (err === null).should.be.true;
        res.status.should.be.equal(200);
        done();
      });
  });

  it("GET /v1/notes/:note_id is OK", function(done) {
    chai
      .request(apiTestConfig.consts.API_URL)
      .get("/v1/notes/" + apiTestConfig.consts.NOTE_ID)
      .set("Authorization", "Bearer " + apiTestConfig.consts.JWT1)
      .end((err, res) => {
        (err === null).should.be.true;
        res.status.should.be.equal(200);
        done();
      });
  });

  it("DELETE /v1/notes/:note_id is OK", function(done) {
    chai
      .request(apiTestConfig.consts.API_URL)
      .delete("/v1/notes/" + apiTestConfig.consts.NOTE_ID)
      .set("Authorization", "Bearer " + apiTestConfig.consts.JWT1)
      .end((err, res) => {
        (err === null).should.be.true;
        res.status.should.be.equal(204);
        done();
      });
  });
});
