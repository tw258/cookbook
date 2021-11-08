const jwt = require('jsonwebtoken');

async function authHandler(req, res, next) {
  const authToken = req.header('Authorization');

  if (!authToken) {
    res.status(400).send('Authorization header did not exist or was empty');
    return;
  }

  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

    // `verify` didn't throw, so the auth token is
    // valid and the user is authenticated.
    // We pass the username along to the next handler.
    res.locals.username = decodedToken.username;
    next();
  } catch (err) {
    res.status(401).send('Invalid auth token');
  }
}

module.exports = authHandler;
