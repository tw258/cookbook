const express = require('express');
const router = express.Router();

const Mongodb = require('../mongodb');
const mongodb = new Mongodb();

// Image routes here:
// - GET      /images?recipe=<recipe-id>   Get all images of a recipe.
// - GET      /images/<image-id>           Get an existing image.
// - POST     /images?recipe=<recipe-id>   Insert a new image and add its ID to the existing recipe.
// - DELETE   /images/<image-id>           Delete an image.

module.exports = router;
