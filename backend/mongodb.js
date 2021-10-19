const { MongoClient } = require("mongodb");

class Mongodb {
  client = new MongoClient(
    "mongodb://root:dbpassword@localhost:27017/?authSource=admin"
  );

  async getRecipes(userId) {
    const collection = await this.connect("recipes");
    const recipes = collection.find({ userId }).toArray();
    return recipes;
  }

  async getImages(imageIds) {
    const collection = await this.connect("images");
    const images = collection.find({ imageIds }).toArray();
    return images;
  }

  async authenticateUser(name, password) {
    const collection = await this.connect("users");
    const foundUser = await collection.findOne({ name });
    if (foundUser == null) return false;
    if (foundUser.password == password) return true;
    return false;
  }

  async connect(collectionName) {
    await this.client.connect();
    console.log("Connected successfully to server");
    const db = this.client.db("cookbook");
    const collection = db.collection(collectionName);
    return collection;
  }
}

module.exports = Mongodb;
