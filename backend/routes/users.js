const express = require('express');
const router = express.Router();
const hashPassword = require('../utils/crypto');

const Mongodb = require('../mongodb');
const mongodb = new Mongodb();

router.get('/', async (_, res) => {
  // `res.locals` was initialized by the authHandler.
  const { username } = res.locals;

  const user = await mongodb.getUserByName(username);

  res.send(user);
});

router.post('/change-password', async (req, res) => {
  const name = req.body.name;
  const newPassword = req.body.password;
  const newHashedPassword = hashPassword(newPassword);

  await mongodb.updatePassword(name, newHashedPassword);

  res.end();
});

module.exports = router;
