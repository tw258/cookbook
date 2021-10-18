const express = require("express");
const cors = require("cors");
const Mongodb = require("./mongodb");

const mongodb = new Mongodb();

mongodb.getRecipes("6166ff1bc80994924974e755").then((r) => {
  console.log(r);
});

// const PORT_HTTP = 3000;

// //init
// const app = express();
// app.use(express.json({ limit: "2mb" }), cors(), authHandler);
// initRecipes();

// function authHandler(req, res, next) {
//   console.log(req.url);

//   //no authentication needed to view single recipe
//   const recipeViewPattern = /\/recipes\/.+/;
//   if (req.method == "GET" && recipeViewPattern.test(req.url)) {
//     next();
//     return;
//   }

//   const authorization = req.header("Authorization");

//   if (!authorization) {
//     console.log("No Authorization Header");
//     res.status(401).send("No Authorization Header was found");
//     return;
//   }

//   const [name, password] = authorization.split(":");

//   //Mongo
//   // const isAuthorized = userdb.some(
//   //   (u) => u.name == name && u.password == password
//   // );
//   if (isAuthorized) {
//     next();
//   } else {
//     res.status(401).end();
//   }
// }

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

// app.listen(PORT_HTTP, () =>
//   console.log(`HTTP Server: Listening on port ${PORT_HTTP}`)
// );
