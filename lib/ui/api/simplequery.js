const request = require('request');

module.exports = (req, res) => {
  const service = req.query.service;
  if (!service) {
    return res.status(422).send({ error: 'missing required field: service' });
  }

  const options = {
    url: `https://s3.amazonaws.com/lcx_assets/required_for_monitoring.json?unnecessary_parameter=${service}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  // it is important to use request or request-promise here, as LC needs its exact body format
  request(options, (err, response, body) => {
    if (err) {
      return res.status(422).send({ error: err.message });
    } else if (response.statusCode !== 200) {
      let message = '';
      try {
        message = JSON.parse(body)[0].error_message;
      } catch (e) {
        message = `Error (${response.statusCode}); unable to parse response from S3 with API key '${service}'`;
      }
      return res.status(response.statusCode).send({ error: message });
    }
    res.status(200).send(body);
  });
};
