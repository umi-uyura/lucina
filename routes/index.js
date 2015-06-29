'use strict';

var express = require('express');
var router = express.Router();

var check = require('lib/birthcheck').check;

var checkConfiguration = function() {
  if (process.env.CHECK_URL === '') {
    var err = new Error('Illegal configutation');
    err.status = 500;
    return err;
  }

  return null;
};

router.get('/', function(req, res, next) {
  var ret = checkConfiguration();
  if (ret) {
    next(ret);
    return;
  }

  res.render('index',
             {
               title: 'Lucina',
               url: process.env.CHECK_URL,
               interval: process.env.CHECK_INTERVAL
             });
});

router.post('/', function(req, res, next) {
  var ret = checkConfiguration();
  if (ret) {
    next(ret);
    return;
  }

  check(process.env.CHECK_URL,
        function() {
          res.render('index',
                     {
                       title: 'Lucina result',
                       url: process.env.CHECK_URL,
                       interval: process.env.CHECK_INTERVAL
                     });
        });
});

module.exports = router;
