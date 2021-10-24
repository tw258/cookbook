const Mongodb = require('../mongodb');

const mongodb = new Mongodb();

async function authHandler(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    res.status(401).send('No Authorization Header was found');
    return;
  }

  // We expect the auth header to have this format "<username>:<password>"
  const [name, password] = authHeader.split(':');

  const isAuthenticated = await mongodb.checkIfUserAuthenticated(name, password);

  if (isAuthenticated) {
    next();
  } else {
    res.status(401).end();
  }
}

module.exports = authHandler;
