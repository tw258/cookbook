![](https://github.com/tw258/cookbook/actions/workflows/ci.yml/badge.svg)

![](https://img.shields.io/badge/Angular-ecf0f1?style=flat&logo=angular&logoColor=2c3e50)   ![](https://img.shields.io/badge/Docker%20Compose-ecf0f1?style=flat&logo=docker&logoColor=2c3e50) ![](https://img.shields.io/badge/NodeJS-ecf0f1?style=flat&logo=nodedotjs&logoColor=2c3e50) ![](https://img.shields.io/badge/MongoDB-ecf0f1?style=flat&logo=mongodb&logoColor=2c3e50)

# Cookbook

<div align="center">
    <img src="documentation/marketing-images/rabbit.svg" width=140px>
    <br>
    <i><strong>Create, manage, and share your recipes.</strong></i>
    <br>
    <u><i><strong>https://tw258.github.io/cookbook</strong></i></u>
</div>

## Development

### Local Setup

0. Make sure you have current versions of [NodeJS](https://nodejs.org/en/) and [Docker](https://www.docker.com/) installed
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

### Run Express Backend in Watch Mode (Hot Reload)

```console
$ docker-compose stop cb-backend # Stop backend container (if running).
$ npm install pm2 -g # Install PM2 globally.
$ cd backend
$ npm run watch
```

### Build and Run Angular Frontend (Hot Reload)

```console
$ cd frontend
$ npm run start # Will open the frontend under http://localhost:4200.
```
