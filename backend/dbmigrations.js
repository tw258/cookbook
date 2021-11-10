const { MongoClient } = require('mongodb');
require('./setup-environment');
const hashPassword = require('./utils/crypto');

const DB_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB_URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@192.168.2.5:27017/cookbook?authSource=admin`; // Development: backend runs directly on host machine.

const RECIPES_COLLECTION = 'recipes';
const IMAGES_COLLECTION = 'images';
const USERS_COLLECTION = 'users';
const recipesCollection = db.collection(RECIPES_COLLECTION);
const imageCollection = db.collection(IMAGES_COLLECTION);
const usersCollection = db.collection(USERS_COLLECTION);

async function migrateDB() {
  const client = new MongoClient(DB_URL);

  await client.connect();
  const db = client.db();

  //Do stuff here
  //await migrate2();

  client.close();
}
migrateDB();

//10.11.2021 hash passwords of all users
async function migrate1() {
  const allUsers = await usersCollection.find().toArray();
  for (const user of allUsers) {
    //hash password
    user.password = hashPassword(user.password);

    console.log(user);

    await collection.replaceOne({ _id: user._id }, user);
  }
}

//10.11.2021 add isThumbnail property to first images
async function migrate2() {
  const allRecipes = await collection.find().toArray();
  for (const currentRezept of allRecipes) {
    if (currentRezept.imageIds.length > 0) {
      await imageCollection.updateOne(
        { _id: currentRezept.imageIds[0] },
        { $set: { isThumbnail: true } },
      );
    }
  }
}
