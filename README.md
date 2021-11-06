![](https://github.com/tw258/cookbook/actions/workflows/ci.yml/badge.svg)

![](https://img.shields.io/badge/Angular-e74c3c?style=flat&logo=angular) ![](https://img.shields.io/badge/Docker%20Compose-blue?style=flat&logo=docker&logoColor=white) ![](https://img.shields.io/badge/Express-16a085?style=flat&logo=express&logoColor=white) ![](https://img.shields.io/badge/MongoDB-9b59b6?style=flat&logo=mongodb&logoColor=white)

# Cookbook

<div align="center">
    <img src="documentation/marketing-images/rabbit.svg" width=150px>
    <br>
    <i><strong>Create, manage, and share your recipes.</strong></i>
    <br>
    <u><i><strong>https://tw258.github.io/cookbook</strong></i></u>
    
</div>

## Local Setup

0. Make sure you have [NodeJS](https://nodejs.org/en/) and [Docker](https://www.docker.com/) installed
1. Clone the repository and navigate into the root directory
2. Depending on your OS, execute the `local-setup.ps1` (Windows) or `local-setup.sh` (Linux) script
3. Add your credentials to the newly created `.env` file

### Build and Run Backend Containers (Express App and MongoDB)

```console
$ docker-compose up --build
```

Or...

```console
$ docker-compose up --build --detach # Run containers in the background.
```

### Build and Run Angular Frontend

```console
$ cd frontend
$ npm run start # Opens the frontend at http://localhost:4200.
```
