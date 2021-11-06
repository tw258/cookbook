![](https://github.com/tw258/cookbook/actions/workflows/ci.yml/badge.svg)

![](https://img.shields.io/badge/Angular-ecf0f1?style=flat&logo=angular&logoColor=2c3e50)   ![](https://img.shields.io/badge/Docker%20Compose-ecf0f1?style=flat&logo=docker&logoColor=2c3e50) ![](https://img.shields.io/badge/NodeJS-ecf0f1?style=flat&logo=nodedotjs&logoColor=2c3e50) ![](https://img.shields.io/badge/MongoDB-ecf0f1?style=flat&logo=mongodb&logoColor=2c3e50)

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
```console
$ docker-compose up --build --detach # Run containers in the background.
```

### Build and Run Angular Frontend

```console
$ cd frontend
$ npm run start # Opens the frontend at http://localhost:4200.
```
