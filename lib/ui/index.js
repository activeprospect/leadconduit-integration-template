const express = require('express');
const path = require('node:path');
const { existsSync } = require('node:fs');

const router = express.Router()
  .use(express.static(path.join(__dirname, 'public')));

if (existsSync(path.join(__dirname, 'oauth'))) {
  router.use('/oauth', require(path.join(__dirname, 'oauth')));
}

if (existsSync(path.join(__dirname, 'api'))) {
  router.use(require(path.join(__dirname, 'api')));
}

module.exports = router;
