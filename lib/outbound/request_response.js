
const validate = (vars) => {
  if (!vars.lead.email || !vars.lead.email.valid) return 'valid email is required';
};


const request = (vars) => {
  return {
    url: 'https://app.leadconduit.com/flows/542c850be1e88a0250a5eee7/sources/53ab40789d29c9d94400004b/submit',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `email=${vars.lead.email}`
  };
};


request.variables = () => {
  return [
    { name: 'lead.email', type: 'email', description: 'Recipient email address', required: true },
    { name: 'lead.first_name', type: 'string', description: 'Recipient first name', required: false },
    { name: 'lead.last_name', type: 'string', description: 'Recipient last name', required: false }
  ];
};


const response = (vars, req, res) => {
  let body;

  if (res.status === 200) {
    body = JSON.parse(res.body);
    if (body.outcome === 'failure') {
      return { outcome: 'failure', reason: body.reason };
    }
    else {
      return { outcome: 'success' };
    }
  }
  else {
    return { outcome: 'error', reason: res.body };
  }
};


response.variables = () => {
  return [
    { name: 'service_being_integrated.outcome', type: 'string', description: 'Integration outcome (success, failure, or error)' },
    { name: 'service_being_integrated.reason', type: 'string', description: 'If outcome is error, the error reason' },
    { name: 'service_being_integrated.appended_value', type: 'string', description: 'Some data returned by Service_Being_Integrated to append to the lead' }
  ];
};


module.exports = {
  request,
  response,
  validate
};
