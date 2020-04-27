# MDJ-Chat

### Built with:
* Node.js
* Express.js
* Socket.io

Change port number inside './.env' file;

---
## Docker
In order to run app with **Docker**, install **Docker** and **Docker Compose**
1. [Install Docker](https://docs.docker.com/get-docker/)
2. [Install Docker Compose](https://docs.docker.com/compose/install/)

To create and start containers:
```bash
docker-compose up
```
_Note_: Add `-d` option to run containers in the background

Docker Compose syntax:
```bash
docker-compose <command> <options>
```
List of commands:
* `up` - Create and start containers
  * `-d` - Detached mode: Run containers in the background 
* `down` - Stop and remove containers, networks, images, and volumes
* `config` - Validate and view the Compose file
* `ps` - List containers
* `images` - List images
* `start` - Start services
* `stop` - Stop services
* `build` - Build or rebuild services
* `logs` - View output from containers
* `rm` - Remove stopped containers
---
## Node.js
Download and run: ```npm init```

### NPM scripts 
* ```npm run start```
* ```npm run dev```
---