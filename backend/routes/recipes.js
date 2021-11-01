const express = require('express');
const router = express.Router();

const Mongodb = require('../mongodb');
const mongodb = new Mongodb();

//GET /recipes?userId=12345
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  const recipes = await mongodb.getRecipesByUserId(userId);

  res.send(recipes);
});

router.get('/:id', (req, res) => {});

router.post('/', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

module.exports = router;
