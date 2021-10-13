const express = require("express");
const cors = require("cors");
const userdb = require("./assets/users.json");
const fs = require("fs");
const { nanoid } = require("nanoid");

const RECIPES_PATH = "./assets/recipes.json";
const PORT_HTTP = 3000;

function authHandler(req, res, next) {
  console.log(req.url);

  //no authentication needed to view single recipe
  const recipeViewPattern = /\/recipes\/.+/;
  if (req.method == "GET" && recipeViewPattern.test(req.url)) {
    next();
    return;
  }

  const authorization = req.header("Authorization");

  if (!authorization) {
    console.log("No Authorization Header");
    res.status(401).send("No Authorization Header was found");
    return;
  }

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
app.use(express.json({ limit: "10mb" }), cors(), authHandler);
initRecipes();

app.get("/login", (req, res) => {
  console.log(`GET ${req.url}`);

  res.status(200).end();
});

app.get("/recipes", (req, res) => {
  console.log(`GET ${req.url}`);

  const recipes = loadRecipes();

  res.send(recipes);
});

app.get("/recipes/:id", (req, res) => {
  console.log(`GET ${req.url}`);

  const recipes = loadRecipes();

  const foundRecipe = recipes.find((r) => r.id == req.params.id);
  if (foundRecipe != undefined) {
    res.send(foundRecipe);
  } else {
    res.status(404).send(`Recipe with id ${req.params.id} was not found`);
  }
});

app.post("/recipes", (req, res) => {
  console.log(`POST ${req.url}`);

  const newRecipe = {
    ...req.body,
    id: nanoid(),
  };

  const recipes = loadRecipes();
  recipes.push(newRecipe);

  storeRecipes(recipes);

  res.send(newRecipe);
});

app.put("/recipes/:id", (req, res) => {
  console.log(`PUT ${req.url}`);

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
  console.log(`DELETE ${req.url}`);

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

function initRecipes() {
  if (!fs.existsSync(RECIPES_PATH)) {
    fs.writeFileSync(RECIPES_PATH, "[]");
  } else {
    try {
      JSON.parse(fs.readFileSync(RECIPES_PATH));
    } catch {
      console.log("Invalid JSON structure!");
    }
  }
}

function loadRecipes() {
  return JSON.parse(fs.readFileSync(RECIPES_PATH));
}

function storeRecipes(recipes) {
  fs.writeFileSync(RECIPES_PATH, JSON.stringify(recipes));
}

app.listen(PORT_HTTP, () =>
  console.log(`HTTP Server: Listening on port ${PORT_HTTP}`)
);
