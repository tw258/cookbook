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

  async connect(collectionName) {
    await this.client.connect();
    console.log("Connected successfully to server");
    const db = this.client.db("cookbook");
    const collection = db.collection(collectionName);
    return collection;
  }
}

module.exports = Mongodb;
