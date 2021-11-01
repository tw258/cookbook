const express = require('express');
const router = express.Router();

const Mongodb = require('../mongodb');
const mongodb = new Mongodb();

router.get('/', async (req, res) => {
  console.log(`GET ${req.url}`);

  const { username, password } = req.query;

  const isAuthorized = await mongodb.checkIfUserAuthenticated(username, password);

  res.send(isAuthorized);
});

module.exports = router;
