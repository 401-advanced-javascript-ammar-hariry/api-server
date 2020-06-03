'use strict';
const requestTime = require('./timestamp');

module.exports = (req, res, next) => {

  console.log('__REQUEST__', req.method, req.path, requestTime());
  next();
};