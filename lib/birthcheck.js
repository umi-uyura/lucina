'use strict';

var sueragent = require('superagent');

// var URL = "http://waternude2015.herokuapp.com/";
// var URL = "http://ggl.co.jp/";
// var URL = "https://concierge.apple.com/workshops/signin";
// var URL = "http://www.yahoo.co.jp";

module.exports.check = function(url, callback) {
  sueragent.get(url)
    .timeout(30000)
    .end(function(err, res){
      if (err) {
        console.log('GET error: ' + err);
        if (err.code) {
          console.log('GET error: ' + err.code);
          callback();
          return;
        }
      }

      if (res.ok) {
        console.log('REACHED!!');
      } else {
        console.log(res.statusCode);
      }

      callback();
    });
};
