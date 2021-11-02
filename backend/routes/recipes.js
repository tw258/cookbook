const express = require('express');
const router = express.Router();

const Mongodb = require('../mongodb');
const mongodb = new Mongodb();

router.get('/', async (req, res) => {
  const userId = req.query.userId;
  const recipes = await mongodb.getRecipesByUserId(userId);

  res.send(recipes);
});

router.get('/:id', async (req, res) => {
  const recipeId = req.params.id;

  const recipe = await mongodb.getRecipeById(recipeId);

  res.send(recipe);
});

router.post('/', async (req, res) => {
  const recipe = req.body;

  const newRecipe = await mongodb.insertRecipe(recipe);

  res.send(newRecipe);
});

router.put('/:id', async (req, res) => {
  const recipeId = req.params.id;
  const recipe = req.body;

  const updatedRecipe = await mongodb.updateRecipe(recipeId, recipe);

  res.send(updatedRecipe);
});

router.delete('/:id', async (req, res) => {
  const recipeId = req.params.id;

  await mongodb.deleteRecipeById(recipeId);

  res.end();
});

module.exports = router;
