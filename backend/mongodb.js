const { MongoClient, ObjectId } = require('mongodb');

const DB_NAME = 'cookbook';
const RECIPES_COLLECTION = 'recipes';
const IMAGES_COLLECTION = 'images';
const USERS_COLLECTION = 'users';

class Mongodb {
  async getUser(userName) {
    const [collection, client] = await this.connect(USERS_COLLECTION);

    const user = await collection.findOne({ name: userName }, { password: 0 });
    client.close();

    return user;
  }

  async getRecipe(recipeId) {
    const _id = ObjectId.createFromHexString(recipeId);

    const [collection, client] = await this.connect(RECIPES_COLLECTION);

    const recipe = await collection.findOne({ _id });
    client.close();

    return recipe;
  }

  async insertRecipe(recipe) {
    const [collection, client] = await this.connect(RECIPES_COLLECTION);

    const { insertedId } = await collection.insertOne(recipe);
    client.close();

    recipe._id = insertedId;

    return recipe;
  }

  async updateRecipe(recipe) {
    const _id = ObjectId.createFromHexString(recipe._id);
    const [collection, client] = await this.connect(RECIPES_COLLECTION);

    await collection.replaceOne({ _id }, recipe);

    client.close();
  }

  async getRecipesByUserId(userIdAsString) {
    const [collection, client] = await this.connect(RECIPES_COLLECTION);

    const userId = ObjectId.createFromHexString(userIdAsString);

    const recipes = await collection.find({ userId }).toArray();
    client.close();
    return recipes;
  }

  async getImage(imageId) {
    const _id = ObjectId.createFromHexString(imageId);

    const [collection, client] = await this.connect(IMAGES_COLLECTION);

    const image = await collection.findOne({ _id });
    client.close();

    return image;
  }

  async insertImage(recipeId, image) {
    // First, we insert the new image.
    const [imagesCollection, imagesClient] = await this.connect(IMAGES_COLLECTION);
    const { insertedId } = await imagesCollection.insertOne({ image });
    imagesClient.close();

    // Now, we add the id of the newly created image
    // to the `images` array of the existing recipe.
    const recipeObjectId = ObjectId.createFromHexString(recipeId);
    const [recipesCollection, recipesClient] = await this.connect(RECIPES_COLLECTION);

    await recipesCollection.updateOne({ _id: recipeObjectId }, { $push: { images: insertedId } });

    recipesClient.close();
  }

  async deleteImage(recipeId, imageId) {
    // First, we delete the image id from the recipe.
    const recipeObjectId = ObjectId.createFromHexString(recipeId);
    const imageObjectId = ObjectId.createFromHexString(imageId);
    const [recipesCollection, recipesClient] = await this.connect(RECIPES_COLLECTION);
    await recipesCollection.updateOne({ _id: recipeObjectId }, { $pull: { imageObjectId } });

    recipesClient.close();

    // Next, we delete the image itself.
    const [imagesCollection, imagesClient] = await this.connect(IMAGES_COLLECTION);
    await imagesCollection.deleteOne({ _id: imageObjectId });
    imagesClient.close();
  }

  async checkIfUserAuthenticated(name, password) {
    const [collection, client] = await this.connect(USERS_COLLECTION);

    const foundUser = await collection.findOne({ name });
    client.close();

    if (foundUser == null) {
      return false;
    }

    if (foundUser.password !== password) {
      return false;
    }

    return true;
  }

  /**
   * Connects to the mongo db and returns an array,
   * where the first item is the specified collection
   * and the second item is a db client that must be
   * closed explicitly after the query was made:
   *
   * @example
   * const [myCollection, myCollectionClient] = this.connect("my-collection");
   *
   * // execute queries...
   *
   * myCollectionClient.close();
   */
  async connect(collectionName) {
    const client = new MongoClient('mongodb://root:dbpassword@localhost:27017/?authSource=admin');

    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(collectionName);

    return [collection, client];
  }
}

module.exports = Mongodb;
