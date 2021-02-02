const url = require('url');

const request = (req) => {
  const uri = url.parse(req.uri, true);

  return {
    first_name: uri.query.first_name,
    last_name: uri.query.last_name,
    email: uri.query.email
  };
};

request.variables = () => {
  return [
    { name: 'first_name', type: 'first_name', description: 'First name' },
    { name: 'last_name', type: 'last_name', description: 'Last name' },
    { name: 'email', type: 'email', description: 'Email address' },
    { name: '*', type: 'wildcard' }
  ];
};

const response = (req, vars) => {
  const body = JSON.stringify({
    outcome: vars.outcome,
    reason: vars.reason,
    lead_id: vars.lead.id
  });

  return {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    },
    body
  };
};

response.variables = () => {
  return [
    { name: 'lead.id', type: 'string', description: 'The lead identifier that the source should reference' },
    { name: 'outcome', type: 'string', description: 'The outcome of the transaction (default is success)' },
    { name: 'reason', type: 'string', description: 'If the outcome was not a success, this is the reason' }
  ];
};

module.exports = {
  request,
  response
};
