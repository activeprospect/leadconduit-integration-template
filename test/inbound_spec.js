const assert = require('chai').assert;
const integration = require('../lib/inbound/request_response');

describe('Inbound Request/Response', () => {
  describe('Request', () => {
    it('should set lead email', () => {
      const req = {
        method: 'GET',
        uri: 'https://app.leadconduit.com/flows/abc/source/xyz?email=hi@example.com'
      };
      const lead = integration.request(req);
      assert.equal(lead.email, 'hi@example.com');
    });

    xit('should have more tests here', () => {
      assert.isTrue(false, 'Need more tests here!');
    });
  });

  describe('Response', () => {
    it('should provide a success outcome', () => {
      const vars = {
        outcome: 'success',
        lead: {
          id: '123'
        }
      };
      const res = integration.response({}, vars);
      const expected = {
        body: '{"outcome":"success","lead_id":"123"}',
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': 37
        }
      };
      assert.deepEqual(res, expected);
    });

    xit('should have more tests here', () => {
      assert.isTrue(false, 'Need more tests here!');
    });
  });
});
