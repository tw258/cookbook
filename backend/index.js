const express = require('express');
const cors = require('cors');
const authHandler = require('./middleware/auth-handler');

const app = express();

// Import middleware into expresss.
app.use(express.json({ limit: '2mb' }));
app.use(cors());
app.use(authHandler);

// Import routes.
const recipeRouter = require('./routes/recipes');
const imageRouter = require('./routes/images');

// Setup routes.
app.use('/recipes', recipeRouter);
app.use('/images', imageRouter);

// Start the server.
const PORT_HTTP = 3000;
app.listen(PORT_HTTP, () =>
  console.log(`Cookbook NodeJS Backend Listening on http://localhost:${PORT_HTTP}`),
);
