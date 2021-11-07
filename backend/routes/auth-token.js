const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const hashPassword = require('../utils/crypto');

const Mongodb = require('../mongodb');
const mongodb = new Mongodb();

router.get('/', async (req, res) => {
  const { username, password } = req.query;

  const hashedPassword = hashPassword(password);

  const isAuthenticated = await mongodb.checkIfUserAuthenticated(username, hashedPassword);

  let authToken = null;
  if (isAuthenticated) {
    // Create a signed token for the authenticated user.
    authToken = jwt.sign({ username }, process.env.JWT_SECRET);
  }

  res.send(authToken);
});

module.exports = router;
