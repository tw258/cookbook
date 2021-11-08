const hash = require('crypto-js/sha256');

function hashPassword(password) {
  return hash(password).toString();
}

module.exports = hashPassword;
