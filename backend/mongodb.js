const { MongoClient, ObjectId } = require('mongodb');

/**
 * When the backend (and the db) run in containers, the backend has to connect to the db
 * via the db's container name which we defined in ./docker-compose.yml as "cb-db".
 *
 * The environment variable `NODE_ENV` is set during build time (see docker-compose.yml).
 *
 * Note that even though the db runs in a container, when connecting via. MongoDB Compass,
 * we have to use 'mongodb://root:dbpassword@localhost:27017' to connect.
 */
const DB_URL =
  process.env.NODE_ENV === 'production'
    ? 'mongodb://root:dbpassword@cb-db:27017' // Production (backend runs in container).
    : 'mongodb://root:dbpassword@localhost:27017'; // Development.

const DB_NAME = 'cookbook';
const RECIPES_COLLECTION = 'recipes';
const IMAGES_COLLECTION = 'images';
const USERS_COLLECTION = 'users';

class Mongodb {
  async getUser(userName) {
    const [collection, client] = await this.connect(USERS_COLLECTION);

    const user = await collection.findOne({ name: userName });
    delete user.password; // Exclude the password from the result.

    client.close();

    return user;
  }

  async getRecipe(recipeId) {
    const _id = new ObjectId(recipeId);

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
    const recipeObjectId = ObjectId.createFromHexString(recipe._id);
    const [collection, client] = await this.connect(RECIPES_COLLECTION);

    await collection.replaceOne({ _id: recipeObjectId }, recipe);

    client.close();
  }

  async getRecipesByUserId(userId) {
    const [collection, client] = await this.connect(RECIPES_COLLECTION);

    const userObjectId = ObjectId.createFromHexString(userId);

    const recipes = await collection.find({ userId: userObjectId }).toArray();
    client.close();

    return recipes;
  }

  async deleteRecipe(recipeId) {
    // First, we delete the recipe itself.
    const [recipeCollection, recipeClient] = await this.connect(RECIPES_COLLECTION);
    const recipeObjectId = new ObjectId(recipeId);

    const recipe = await recipeCollection.findOneAndDelete({ _id: recipeObjectId });
    recipeClient.close();

    // Then, we delete all images of the recipe.
    const [imagesCollection, imagesClient] = await this.connect(IMAGES_COLLECTION);
    const imageObjectIds = recipe.imageIds.map(id => new ObjectId(id));

    await imagesCollection.deleteMany({ _id: { $in: imageObjectIds } });
    imagesClient.close();
  }

  async getImageById(imageId) {
    const imageObjectId = ObjectId.createFromHexString(imageId);

    const [collection, client] = await this.connect(IMAGES_COLLECTION);

    const image = await collection.findOne({ _id: imageObjectId });
    client.close();

    return image;
  }

  async insertImage(recipeId, image) {
    // First, we insert the new image.
    const [imagesCollection, imagesClient] = await this.connect(IMAGES_COLLECTION);
    const { insertedId: insertedImageId } = await imagesCollection.insertOne({ image });
    imagesClient.close();

    // Now, we add the id of the newly created image
    // to the `images` array of the existing recipe.
    const recipeObjectId = ObjectId.createFromHexString(recipeId);
    const [recipesCollection, recipesClient] = await this.connect(RECIPES_COLLECTION);

    await recipesCollection.updateOne(
      { _id: recipeObjectId },
      { $push: { imageIds: insertedImageId } },
    );

    recipesClient.close();
  }

  async deleteImage(recipeId, imageId) {
    const recipeObjectId = ObjectId.createFromHexString(recipeId);
    const imageObjectId = ObjectId.createFromHexString(imageId);

    // First, we delete the image id from the recipe.
    const [recipesCollection, recipesClient] = await this.connect(RECIPES_COLLECTION);
    await recipesCollection.updateOne(
      { _id: recipeObjectId },
      { $pull: { imageIds: imageObjectId } },
    );
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
    const client = new MongoClient(DB_URL);

    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(collectionName);

    return [collection, client];
  }
}

module.exports = Mongodb;
