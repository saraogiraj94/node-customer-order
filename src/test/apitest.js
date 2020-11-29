const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const server = require("../index");

const user = {
  name: "Raj",
  email: "abc@abc.com",
  password: "abcd1234",
};

describe("Customer", () => {
  describe("/Signup ", () => {
    it("Signup with short password then required", (done) => {
      chai
        .request(server)
        .post("/customer/signup")
        .send({
          name: user.name,
          email: user.email,
          password: "abc",
        })
        .end((err, res) => {
          res.should.have.status(400);
          should.exist(res.body.errors.password);
          done();
        });
    });

    it("it should signup the user and generate a user id", (done) => {
      chai
        .request(server)
        .post("/customer/signup")
        .send({
          name: user.name,
          email: user.email,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          should.exist(res.body.customer._id);
          done();
        });
    });
  });

  describe("/Login ", () => {
    it("Login with wrong password", (done) => {
      chai
        .request(server)
        .post("/customer/login")
        .send({
          email: user.email,
          password: "wrongpass",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("Login with correct password", (done) => {
      chai
        .request(server)
        .post("/customer/login")
        .send({
          email: user.email,
          password: user.password,
        })
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          should.exist(res.body.customer._id);
          should.exist(res.body.token);
          done();
        });
    });
  });
});
