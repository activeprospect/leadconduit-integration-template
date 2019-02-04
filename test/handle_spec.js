const assert = require('chai').assert;
const nock = require('nock');
const integration = require('../lib/outbound/handle');
const parser = require('leadconduit-integration').test.types.parser(integration.requestVariables());

describe('Handle', () => {

  describe('Validation', () => {

    it('should validate email is present', () => {
      const val = integration.validate(parser({lead: {}}));
      assert.equal(val, 'email is required');
    });

    xit('should have more tests here', () => {
      assert.isTrue(false, 'Need more tests here!');
    });

  });

  describe('Handle', () => {

    afterEach(() => {
      nock.cleanAll();
    });

    it('should have the lead email', (done) => {
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
