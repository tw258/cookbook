const { MongoClient } = require('mongodb');
const { nanoid: createId } = require('nanoid');

/**
 * When the backend (and the db) run in containers, the backend has to connect to the db
 * via the db's container name which we defined in ./docker-compose.yml as "cb-db".
 *
 * The environment variable `NODE_ENV` is set during build time (see docker-compose.yml).
 *
 * Note that even though the db runs in a container, when connecting via. MongoDB Compass,
 * we have to use 'mongodb://root:dbpassword@localhost:27017' to connect.
 */
const DB_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB_URL =
  process.env.NODE_ENV === 'production'
    ? `mongodb://${DB_USERNAME}:${DB_PASSWORD}@cb-db:27017/cookbook?authSource=admin` // Production: backend runs in container.
    : `mongodb://${DB_USERNAME}:${DB_PASSWORD}@localhost:27017/cookbook?authSource=admin`; // Development: backend runs directly on host machine.

const RECIPES_COLLECTION = 'recipes';
const IMAGES_COLLECTION = 'images';
const USERS_COLLECTION = 'users';

class Mongodb {
  async getUserByName(username) {
    const [collection, client] = await this.connect(USERS_COLLECTION);

    const user = await collection.findOne({ name: username });
    delete user.password; // Exclude the password from the result.

    client.close();

    return user;
  }

  async getRecipeById(recipeId) {
    const [collection, client] = await this.connect(RECIPES_COLLECTION);

    const recipe = await collection.findOne({ _id: recipeId });
    client.close();

    return recipe;
  }

  async insertRecipe(recipe) {
    const [collection, client] = await this.connect(RECIPES_COLLECTION);

    recipe._id = createId();
    await collection.insertOne(recipe);
    client.close();

    return recipe;
  }

  async updateRecipe(recipeId, updatedRecipe) {
    const [collection, client] = await this.connect(RECIPES_COLLECTION);

    await collection.replaceOne({ _id: recipeId }, updatedRecipe);

    client.close();

    return updatedRecipe;
  }

  async getRecipesByUserId(userId) {
    const [collection, client] = await this.connect(RECIPES_COLLECTION);

    const recipes = await collection.find({ userId }).toArray();
    client.close();

    return recipes;
  }

  async deleteRecipeById(recipeId) {
    // First, we delete the recipe itself.
    const [recipeCollection, recipeClient] = await this.connect(RECIPES_COLLECTION);
    const { value: deletedRecipe } = await recipeCollection.findOneAndDelete({ _id: recipeId });

    recipeClient.close();

    if (deletedRecipe.imageIds.length > 0) {
      // Then, we delete all images of the deleted recipe (if it has any).
      const [imagesCollection, imagesClient] = await this.connect(IMAGES_COLLECTION);

      await imagesCollection.deleteMany({ _id: { $in: deletedRecipe.imageIds } });
      imagesClient.close();
    }
  }

  async getImageById(imageId) {
    const [collection, client] = await this.connect(IMAGES_COLLECTION);

    const image = await collection.findOne({ _id: imageId });
    client.close();

    return image;
  }

  async insertImage(recipeId, image) {
    // First, we insert the new image.
    const [imagesCollection, imagesClient] = await this.connect(IMAGES_COLLECTION);

    image._id = createId();
    await imagesCollection.insertOne(image);
    imagesClient.close();

    // Now, we add the id of the newly created image
    // to the `images` array of the existing recipe.
    const [recipesCollection, recipesClient] = await this.connect(RECIPES_COLLECTION);

    await recipesCollection.updateOne({ _id: recipeId }, { $push: { imageIds: image._id } });

    recipesClient.close();
  }

  async deleteImage(recipeId, imageId) {
    // First, we delete the image id from the recipe.
    const [recipesCollection, recipesClient] = await this.connect(RECIPES_COLLECTION);
    await recipesCollection.updateOne({ _id: recipeId }, { $pull: { imageIds: imageId } });
    recipesClient.close();

    // Next, we delete the image itself.
    const [imagesCollection, imagesClient] = await this.connect(IMAGES_COLLECTION);
    await imagesCollection.deleteOne({ _id: imageId });
    imagesClient.close();
  }

  async updatePassword(name, newHashedPassword) {
    const [collection, client] = await this.connect(USERS_COLLECTION);

    await collection.updateOne({ name }, { $set: { password: newHashedPassword } });

    client.close();
  }

  async checkIfUserAuthenticated(name, hashedPassword) {
    const [collection, client] = await this.connect(USERS_COLLECTION);

    const foundUser = await collection.findOne({ name });
    client.close();

    if (foundUser == null) {
      return false;
    }

    if (foundUser.password !== hashedPassword) {
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
    const db = client.db();
    const collection = db.collection(collectionName);

    return [collection, client];
  }
}

module.exports = Mongodb;
