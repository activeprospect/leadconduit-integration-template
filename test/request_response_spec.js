const assert = require('chai').assert;
const outbound = require('../lib/outbound/request_response');

describe('Validation', function() {

  it('should validate email is present', function() {
    const val = outbound.validate({lead: {}});
    assert.equal(val, 'email is required');
  });

  xit('should have more tests here', function() {
    assert.isTrue(false, 'Need more tests here!');
  });

});

describe('Request', function() {

  it('should have the lead email', function() {
    const req = outbound.request({lead: { email: 'foo@bar.com'}});
    assert.equal(req.body, 'email=foo@bar.com');
  });

  xit('should have more tests here', function() {
    assert.isTrue(false, 'Need more tests here!');
  });

});

describe('Response', function() {

  it('should parse success', function() {
    const res = outbound.response({}, {}, {status: 200, body: '{"outcome":"success"}'});
    assert.equal(res.outcome, 'success');
  });

  xit('should have more tests here', function() {
    assert.isTrue(false, 'Need more tests here!');
  });

});
