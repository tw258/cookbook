![example workflow](https://github.com/tw258/cookbook/actions/workflows/ci.yml/badge.svg)

# Cookbook

<div style="text-align:center">
    <img src="documentation/marketing-images/rabbit.svg" width=150px>
    <br>
    <i><strong>Create, manage and share your recipes - nobody does it better than cookbook.</strong></i>
</div>

## Local Setup

0. Make sure you have [NodeJS](https://nodejs.org/en/) and [Docker](https://www.docker.com/) installed
1. Clone the repository and navigate into the root directory
2. Depending on your OS, execute the `local-setup.(ps1|sh)` script
3. Add your credentials to the newly created `.env` file

### Build and Run Backend Containers (Express App and MongoDB)

```console
$ docker-compose up --build
$ docker-compose up --build --detach # Run containers in the background.
```

### Build and Run Frontend (Angular SPA)

```console
$ cd frontend
$ npm run start # Opens the frontend at http://localhost:4200.
```
