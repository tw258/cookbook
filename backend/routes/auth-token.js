const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Mongodb = require('../mongodb');
const mongodb = new Mongodb();

router.get('/', async (req, res) => {
  const { username, password } = req.query;

  const isAuthenticated = await mongodb.checkIfUserAuthenticated(username, password);

  let authToken = null;
  if (isAuthenticated) {
    // Create a signed token for the authenticated user.
    authToken = jwt.sign({ username }, process.env.JWT_SECRET);
  }

  res.send(authToken);
});

module.exports = router;
