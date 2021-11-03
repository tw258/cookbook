const express = require('express');
const cors = require('cors');
const authHandler = require('./middleware/auth-handler');
const logger = require('./middleware/logger');

// Load and initialize environment variables.
require('./setup-environment');

const app = express();

// Add middleware.
app.use(express.json({ limit: '2mb' }));
app.use(cors());
app.use(logger);

// Import routes.
const recipeRouter = require('./routes/recipes');
const imageRouter = require('./routes/images');
const usersRouter = require('./routes/users');
const checkCredentialsRouter = require('./routes/check-credentials');

// Setup routes.
app.use('/check-credentials', checkCredentialsRouter);
app.use('/recipes', authHandler, recipeRouter);
app.use('/images', authHandler, imageRouter);
app.use('/users', authHandler, usersRouter);

// Start the server.
const PORT_HTTP = 3000;
app.listen(PORT_HTTP, () =>
  console.log(`Cookbook NodeJS Backend Listening on http://localhost:${PORT_HTTP}`),
);
