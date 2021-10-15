const express = require('express');
const { json } = require('body-parser');
const simplequery = require('./simplequery');
const multiendpoints = require('./multiendpoints');

module.exports =
  express.Router()
    .use(json())
    .use('/simplequery', simplequery)
    .use('/multiendpoints', multiendpoints);
