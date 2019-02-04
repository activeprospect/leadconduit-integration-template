const assert = require('chai').assert;
const integration = require('../lib/outbound/request_response');
const parser = require('leadconduit-integration').test.types.parser(integration.request.variables());

describe('Request/Response', () => {

  describe('Validation', () => {

    it('should validate email is present', () => {
      const val = integration.validate(parser({lead: {}}));
      assert.equal(val, 'email is required');
    });

    xit('should have more tests here', () => {
      assert.isTrue(false, 'Need more tests here!');
    });

  });

  describe('Request', () => {

    it('should have the lead email', () => {
      const req = integration.request(parser({lead: {email: 'foo@bar.com'}}));
      assert.equal(req.body, 'email=foo@bar.com');
    });

    xit('should have more tests here', () => {
      assert.isTrue(false, 'Need more tests here!');
    });

  });

  describe('Response', () => {

    it('should parse success', () => {
      const res = integration.response({}, {}, {status: 200, body: '{"outcome":"success"}'});
      assert.equal(res.outcome, 'success');
    });

    xit('should have more tests here', () => {
      assert.isTrue(false, 'Need more tests here!');
    });

  });

});
