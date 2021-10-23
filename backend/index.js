const express = require("express");
const cors = require("cors");
const Mongodb = require("./mongodb");

const mongodb = new Mongodb();

const PORT_HTTP = 3000;

const app = express();
app.use(express.json({ limit: "2mb" }), cors(), authHandler);

async function authHandler(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).send("No Authorization Header was found");
    return;
  }

  const [name, password] = authHeader.split(":");

  const isAuthenticated = await mongodb.checkIfUserAuthenticated(
    name,
    password
  );

  if (isAuthenticated) {
    next();
  } else {
    res.status(401).end();
  }
}

// app.post("/recipes", (req, res) => {
//   const recipe = req.body;
//   console.log(recipe);

//   res.send();
// });

// //Endpoints
// app.get("/login", (req, res) => {
//   console.log(`GET ${req.url}`);

//   res.status(200).end();
// });

// app.get("/recipes", (req, res) => {
//   console.log(`GET ${req.url}`);
// });

// app.get("/recipes/:id", (req, res) => {
//   console.log(`GET ${req.url}`);
// });

// app.post("/recipes", (req, res) => {
//   console.log(`POST ${req.url}`);
// });

// app.put("/recipes/:id", (req, res) => {
//   console.log(`PUT ${req.url}`);
// });

// app.delete("/recipes/:id", (req, res) => {
//   console.log(`DELETE ${req.url}`);
// });

app.listen(PORT_HTTP, () =>
  console.log(`HTTP Server: Listening on port ${PORT_HTTP}`)
);
