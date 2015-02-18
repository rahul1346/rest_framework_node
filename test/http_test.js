'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
require('../http_server');
require('../requestHandler');

chai.use(chaihttp);

var expect = chai.expect;

describe('simple get request', function() {
  it('responds to a get request at start', function(done) {
    chai.request('localhost:8888/start')
      .get('/start')
      .send({hello: 'world'})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('responds to a get request at show', function(done) {
    chai.request('localhost:8888/show')
      .get('/show')
      .send({hello: 'world'})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

});