const express = require("express");
const cors = require("cors");
const userdb = require("./users.json");
const fs = require("fs");
const { nanoid } = require("nanoid");
const recipePath = "./recipes2.json";

function AuthenticationHandler(req, res, next) {
  const authorization = req.header("Authorization");

  //todo null value handler bzw split problem (any/string)
  const [name, password] = authorization.split(":");

  const isAuthorized = userdb.some(
    (u) => u.name == name && u.password == password
  );
  if (isAuthorized) {
    next();
  } else {
    res.status(401).end();
  }
}

const app = express();
app.use(cors(), express.json());

//TODO loadRecipes anpassen, wenn JSON leer.

app.get("/recipes", (req, res) => {
  console.log("get recipes");

  const recipes = loadRecipes();

  res.send(recipes);
});

app.get("/recipes/:id", (req, res) => {
  console.log("get recipes by id");

  const recipes = loadRecipes();
  const foundRecipe = recipes.find((r) => r.id == req.params.id);
  if (foundRecipe != undefined) {
    res.send(foundRecipe);
  } else {
    res.status(404).send(`Recipe with id ${req.params.id} was not found`);
  }
});

app.post("/recipes", (req, res) => {
  console.log("post recipe");
  console.log(req.body);

  const newRecipe = {
    ...req.body,
    id: nanoid(),
  };

  recipes = loadRecipes();
  recipes.push(newRecipe);

  storeRecipes(recipes);

  res.send(newRecipe);
});

app.put("/recipes/:id", (req, res) => {
  console.log("put recipe by id");

  const recipes = loadRecipes();
  const index = recipes.findIndex((r) => r.id == req.params.id);
  if (index != -1) {
    recipes[index] = req.body;
    storeRecipes(recipes);

    res.send(recipes[index]);
  } else {
    res.status(404).send(`Recipe with id ${req.params.id} was not found`);
  }
});

app.delete("/recipes/:id", (req, res) => {
  console.log("delete recipe by id");

  const recipes = loadRecipes();
  const index = recipes.findIndex((r) => r.id == req.params.id);
  if (index != -1) {
    recipes.splice(index, 1);
    storeRecipes(recipes);

    res.status(200).end();
  } else {
    res.status(404).send(`Recipe with id ${req.params.id} was not found`);
  }
});

function loadRecipes() {
  const file = fs.readFileSync(recipePath);
  if (file) {
    const recipes = JSON.parse(file);
    return recipes;
  }
  return [];
}

function storeRecipes(recipes) {
  fs.writeFileSync(recipePath, JSON.stringify(recipes));
}

app.listen(3000, () => console.log("server running"));
