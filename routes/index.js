'use strict';

var express = require('express');
var router = express.Router();

var check = require('lib/birthcheck').check;

router.get('/', function(req, res, next) {
  res.render('index',
             {
               title: 'Express',
               url: process.env.CHECK_URL,
               interval: process.env.CHECK_INTERVAL
             });
});

router.post('/', function(req, res, next) {
  check(process.env.CHECK_URL,
        function() {
          res.render('index',
                     {
                       title: 'Express POST',
                       url: process.env.CHECK_URL,
                       interval: process.env.CHECK_INTERVAL
                     });
        });
});

module.exports = router;
