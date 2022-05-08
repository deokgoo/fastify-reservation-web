# Fastify toy 프로젝트

## Required
- docker
- node

## How to install
본 프로젝트는 `npm manager`를 사용하고 있습니다.

package install
```sh
npm i
```

## How to run
docker mysql port: `3306` <br/>
docker mysql admin port: `8080`

docker run
```sh
cd docker
docker-compose up
```

fastify server port: `4000`

fastify run
```sh
npm start
```

## Core tech stack
- fastify
- ejs
- jwt
- webpack, babel
- mysql
