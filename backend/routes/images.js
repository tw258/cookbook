const express = require('express');
const router = express.Router();

const Mongodb = require('../mongodb');
const mongodb = new Mongodb();

// GET /images/<image-id>
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const image = await mongodb.getImageById(id);

  res.send(image);
});

// POST /images?recipeId=<recipe-id>
router.post('/', async (req, res) => {
  const { recipeId } = req.query;
  const imageToAdd = req.body;

  const addedImage = await mongodb.insertImage(recipeId, imageToAdd);

  res.send(addedImage);
});

// DELETE /images/<image-id>?recipeId=<recipe-id>
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { recipeId } = req.query;

  await mongodb.deleteImage(recipeId, id);

  res.end();
});

module.exports = router;