const { MongoClient } = require('mongodb');
require('./setup-environment');
const hashPassword = require('./utils/crypto');

const DB_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB_URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@192.168.2.5:27017/cookbook?authSource=admin`; // Development: backend runs directly on host machine.

const RECIPES_COLLECTION = 'recipes';
const IMAGES_COLLECTION = 'images';
const USERS_COLLECTION = 'users';

async function migrateDB() {
  const client = new MongoClient(DB_URL);

  await client.connect();
  const db = client.db();
  const collection = db.collection(RECIPES_COLLECTION);
  const imageCollection = db.collection(IMAGES_COLLECTION);

  //Do stuff here

  const allRecipes = await collection.find().toArray();

  for (const currentRezept of allRecipes) {
    if (currentRezept.imageIds.length > 0) {
      await imageCollection.updateOne(
        { _id: currentRezept.imageIds[0] },
        { $set: { isThumbnail: true } },
      );
    }
  }

  // const allUsers = await collection.find().toArray();
  // for (const user of allUsers) {
  //   //hash password
  //   user.password = hashPassword(user.password);

  //   console.log(user);

  //   await collection.replaceOne({ _id: user._id }, user);
  // }

  client.close();
}

migrateDB();
