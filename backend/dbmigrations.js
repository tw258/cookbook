const { MongoClient } = require('mongodb');
require('./setup-environment');
const hashPassword = require('./utils/crypto');

const DB_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB_URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@localhost:27017/cookbook?authSource=admin`; // Development: backend runs directly on host machine.

const RECIPES_COLLECTION = 'recipes';
const IMAGES_COLLECTION = 'images';
const USERS_COLLECTION = 'users';
var recipesCollection = null;
var imageCollection = null;
var usersCollection = null;

async function migrateDB() {
  const client = new MongoClient(DB_URL);

  await client.connect();
  const db = client.db();
  recipesCollection = db.collection(RECIPES_COLLECTION);
  imageCollection = db.collection(IMAGES_COLLECTION);
  usersCollection = db.collection(USERS_COLLECTION);

  //Do stuff here
  await migrate4();

  client.close();
}
migrateDB();

//21.11.2021 set timestamp for every recipe
async function migrate4() {
  const allRecipes = await recipesCollection.find().toArray();
  for (const currentRezept of allRecipes) {
    if (!currentRezept.dateUpdatedAsISOString) {
      var today = new Date().toISOString();
      console.log(today);
      await recipesCollection.updateOne(
        { _id: currentRezept._id },
        { $set: { dateUpdatedAsISOString: today } },
      );
    }
  }
}

//10.11.2021 reset pw tobi
async function migrate3() {
  const newPassword = hashPassword('cb2021');
  console.log(newPassword);
  await usersCollection.updateOne({ name: 'tobi' }, { $set: { password: newPassword } });
}

//10.11.2021 add isThumbnail property to first images
async function migrate2() {
  const allRecipes = await recipesCollection.find().toArray();
  for (const currentRezept of allRecipes) {
    if (currentRezept.imageIds.length > 0) {
      await imageCollection.updateOne(
        { _id: currentRezept.imageIds[0] },
        { $set: { isThumbnail: true } },
      );
    }
  }
}

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
