const request = require('request');

module.exports = (req, res) => {

  const apiKey = req.query.api_key;
  if (!apiKey) {
    return res.status(422).send({ error: 'missing required field: api_key' });
  }

  const options = {
    url: `https://s3.amazonaws.com/lcx_assets/required_for_monitoring.json?unnecessary_api_key=${apiKey}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
  };

  request(options, (err, response, body) => {
    if (err) {
      return res.status(422).send({ error: err.message });
    }
    else if (response.statusCode !== 200) {
      let message = '';
      try {
        message = JSON.parse(body)[0].error_message;
      }
      catch (e) {
        message = `Error (${response.statusCode}); unable to parse response from S3 with API key '${apiKey}'`;
      }
      return res.status(response.statusCode).send({ error: message });
    }
    res.status(200).send(body);
  });

};
