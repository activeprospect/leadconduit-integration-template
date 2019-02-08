const assert = require('chai').assert;
const nock = require('nock');
const integration = require('../lib/outbound/handle');
const parser = require('leadconduit-integration').test.types.parser(integration.requestVariables());

describe('Handle', () => {

  describe('Validation', () => {

    it('should pass validation when all required fields are present', () => {
      assert.isUndefined(integration.validate(parser({lead: {email: 'foo@example.com'}})));
    });

    it('should validate email is present', () => {
      const val = integration.validate(parser({lead: {}}));
      assert.equal(val, 'valid email is required');
    });

    xit('should have more tests here', () => {
      assert.isTrue(false, 'Need more tests here!');
    });

  });

  describe('Handle', () => {

    afterEach(() => {
      nock.cleanAll();
    });

    it('should succeed with good input', (done) => {
      nock('https://example.com')
        .post('/lookup/123')
        .reply(200, '{ "number": 42 }', {'Content-Type': 'application/json'});

      integration.handle(parser({lead: {email: 'foo@bar.com'}}), (err, event) => {
        assert.equal(event.handle.outcome, 'success');
        assert.equal(event.handle.appendedNumber, 42);
        done();
      });
    });

    xit('should have more tests here', () => {
      assert.isTrue(false, 'Need more tests here!');
    });

  });

});
