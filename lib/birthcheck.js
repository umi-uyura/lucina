'use strict';

var sueragent = require('superagent');

module.exports.check = function(url, callback) {
  sueragent.get(url)
    .timeout(20000)
    .end(function(err, res) {
      var e = { code: 0, msg: '' };
      var r = { ok: false, status: 0 };

      if (err) {
        console.log('CONNECTION ERROR: ' + err);
        e.msg = err;
        if (err.code) {
          console.log('CONNECTION ERROR CODE: ' + err.code);
          e.code = err.code;
          callback(e, null);
          return;
        }
      }

      if (res.ok) {
        console.log('REACHED !!!');
        r.ok = true;
      } else {
        console.log('RESPONCE ERROR: ' + res.statusCode);
        r.status = res.statusCode;
      }

      callback(e, r);
    });
};
