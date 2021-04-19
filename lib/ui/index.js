const express = require('express');
const path = require('path');
const { existsSync } = require('fs');

let router = express.Router()
  .use(express.static(path.join(richUiRoot, 'public')));

if (existsSync(path.join(richUiRoot, 'oauth'))) {
  router.use('/oauth', require(path.join(richUiRoot, 'oauth')));
}

if (existsSync(path.join(richUiRoot, 'api'))) {
  router.use(require(path.join(richUiRoot, 'api')));
}

module.exports = router;
