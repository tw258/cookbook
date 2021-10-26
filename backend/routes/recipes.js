const express = require('express');
const router = express.Router();

const Mongodb = require('../mongodb');
const mongodb = new Mongodb();

//GET /recipes?userId=12345
router.get('/', async (req, res) => {
  console.log(`GET ${req.url}`);

  const userId = req.query.userId;
  const recipes = await mongodb.getRecipesByUserId(userId);

  res.send(recipes);
});

router.get('/:id', (req, res) => {
  console.log(`GET ${req.url}`);
});

router.post('/', (req, res) => {
  console.log(`POST ${req.url}`);
});

router.put('/:id', (req, res) => {
  console.log(`PUT ${req.url}`);
});

router.delete('/:id', (req, res) => {
  console.log(`DELETE ${req.url}`);
});

module.exports = router;
