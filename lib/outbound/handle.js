const request = require('request');

const validate = (vars) => {
  if (!vars.lead.email || !vars.lead.email.valid) return 'valid email is required';
};


const handle = (vars, callback) => {

  const opts = {
    uri: `https://example.com/lookup/123`,
    method: 'POST',
    body: `email=${vars.lead.email}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  request(opts, (err, response) => {
    if (err) {
      return callback(null, {
        handle: {
          outcome: 'error',
          reason: err.message || `Unknown Error: ${response.statusCode}`
        }
      });
    }

    let res = JSON.parse(response.body);
    return callback(null, {
      handle: {
        outcome: 'success',
        appendedNumber: res.number
      }
    });
  });

};

const requestVariables = () => {
  return [
    { name: 'lead.email', type: 'email', description: 'Recipient email address', required: true },
    { name: 'lead.first_name', type: 'string', description: 'Recipient first name', required: false },
    { name: 'lead.last_name', type: 'string', description: 'Recipient last name', required: false }
  ];
};


const responseVariables = () => {
  return [
    { name: 'service_being_integrated.outcome', type: 'string', description: 'Integration outcome (success, failure, or error)' },
    { name: 'service_being_integrated.reason', type: 'string', description: 'If outcome is error, the error reason' },
    { name: 'service_being_integrated.appended_value', type: 'string', description: 'Some data returned by Service_Being_Integrated to append to the lead' }
  ];
};


module.exports = {
  handle,
  requestVariables,
  responseVariables,
  validate
};
