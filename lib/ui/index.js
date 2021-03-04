const express = require('express');
const path    = require('path');
const { existsSync } = require('fs');

let router = express.Router()

if (existsSync(path.join(__dirname, '/oauth'))) {
  router.use('/oauth', require('./oauth'));
}

router.use(express.static(path.join(__dirname, '/public')));

if (process.env.NODE_ENV === 'development') {
  router.use(require('./webpack'));
}

if (existsSync(path.join(__dirname, '/api'))) {
  router.use(require('./api'));
}

module.exports = router;
