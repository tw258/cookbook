const express = require("express");
const userdb = require("./users.json");
const fs = require("fs");

function AuthenticationHandler(req, res, next) {
  const authorization = req.header("Authorization");
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
app.use(express.json(), AuthenticationHandler);

app.get("/recipes", (req, res) => {
  console.log("get reached");
  res.send("recipes");
});

app.get("/recipes/:id", (req, res) => {
  console.log(req.params.id);
  res.send("recipe");
});

app.post("/recipes", (req, res) => {
  console.log(req.body);
  res.send("recipe");
});

app.put("/recipes/:id", (req, res) => {
  res.send("recipe");
});

app.delete("/recipes/:id", (req, res) => {
  res.status(200).end();
});

app.listen(3000, () => console.log("server running"));
