const express = require('express');
const router = express.Router();

const Mongodb = require('../mongodb');
const mongodb = new Mongodb();

router.get('/', async (req, res) => {
  const authHeader = req.header('Authorization');
  const [username] = authHeader.split(':');

  const user = await mongodb.getUserByName(username);

  res.send(user);
});

module.exports = router;
