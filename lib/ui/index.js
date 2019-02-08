const express = require('express');
const path    = require('path');
const api     = require('./api');

let router = express.Router()
  .use(express.static(path.join(__dirname, '/public')));

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  router.use(require('./webpack'));
}

router.use(api);

module.exports = router;
