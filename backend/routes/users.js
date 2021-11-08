const express = require('express');
const router = express.Router();

const Mongodb = require('../mongodb');
const mongodb = new Mongodb();

router.get('/', async (_, res) => {
  // `res.locals` was initialized by the authHandler.
  const { username } = res.locals;

  const user = await mongodb.getUserByName(username);

  res.send(user);
});

module.exports = router;
