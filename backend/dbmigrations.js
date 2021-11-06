const { MongoClient } = require('mongodb');
require('./setup-environment');

const DB_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB_URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@localhost:27017/cookbook?authSource=admin`; // Development: backend runs directly on host machine.

const RECIPES_COLLECTION = 'recipes';
const IMAGES_COLLECTION = 'images';
const USERS_COLLECTION = 'users';

async function migrateDB() {
  const client = new MongoClient(DB_URL);

  await client.connect();
  const db = client.db();
  const collection = db.collection(RECIPES_COLLECTION);

  //Do stuff here
  // const allRecipes = await collection.find().toArray();

  // for (const recipe of allRecipes) {
  //   for (const ingredient of recipe.ingredients) {
  //     if (ingredient.measurement === 'Stck') {
  //       ingredient.measurement = 'Stk';
  //     }
  //   }
  //   await collection.replaceOne({ _id: recipe._id }, recipe);
  // }

  client.close();
}

migrateDB();
