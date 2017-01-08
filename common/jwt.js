
const jwt = require('jsonwebtoken');
const privateConfig = require('../configs/private');

exports.create = (obj, time, cert) => {
  cert = cert || privateConfig.jwt_cert;
  return jwt.sign(obj, cert, {
    algorithm: 'HS256',
    expiresIn: time || '2d',
  });
};

exports.verify = (token, cert) => {
  if (typeof cert === 'undefined') {
    cert = privateConfig.jwt_cert;
  }
  return jwt.verify(token, cert);
};
