const express = require('express');
const router = express.Router();

const Mongodb = require('../mongodb');
const mongodb = new Mongodb();

router.get('/', async (req, res) => {
  const authHeader = req.header('Authorization');
  const [name] = authHeader.split(':');

  const user = await mongodb.getUser(name);

  res.send(user);
});

module.exports = router;
