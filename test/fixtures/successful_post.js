var nock = require('nock');

nock('https://example.com:443', {"encodedQueryParams":true})
  .post('/lookup/123', "email=foo@bar.com")
  .reply(200, {"outcome":"success","appendedNumber":42}, [ 'Cache-Control',
  'max-age=604800',
  'Content-Type',
  'text/html; charset=UTF-8',
  'Date',
  'Mon, 25 Feb 2019 17:04:04 GMT',
  'Expires',
  'Mon, 04 Mar 2019 17:04:04 GMT',
  'Server',
  'EOS (vny006/0451)',
  'Content-Length',
  '61',
  'Connection',
  'close' ]);
