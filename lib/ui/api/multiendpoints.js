const { Router } = require('express');

const lists = ['list uno', 'list dos', 'list tres'];

module.exports =
  new Router()
    .get('/', (req, res, next) => {
      if (lists.length >= 3) {
        res.status(200).send(lists);
      } else {
        return next(new Error('Problem with service_being_integrated...'));
      }
    })
    .post('/addlist', (req, res, next) => {
      try {
        // real, actual POST to wherever would happen here

        const name = req.body.name; // req.body is already parsed by 'body-parser'
        lists.push(name + ' [' + new Date().getMilliseconds() % 1000 + ']');
        res.status(201).send(lists);
      } catch (e) {
        return next(new Error('Problem parsing request body for addlist: ' + e.message));
      }
    });
