if (process.env.NODE_ENV === 'production') {
  // Backend runs in a container and all environment variables
  // were already passed to the node process by docker-compose.
} else {
  // Backend runs directly on host machine (e.g., via PM2) and so we must
  // read the environment variables ourselves and overwrite the `NODE_ENV` variable.

  require('dotenv').config({ path: '../.env' });
  process.env.NODE_ENV = 'development';
}
