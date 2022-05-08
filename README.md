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

## Directory
```
fastify-toy-rental-book
├─ docker
│  ├─ docker-compose.yml
│  └─ mysql
│     └─ docker-entrypoint-initdb.d
│        └─ create_database_create.sh
├─ src
│  ├─ @types
│  │  └─ fastify
│  │     └─ index.d.ts
│  ├─ db
│  │  └─ sequelize.ts
│  ├─ middleware
│  │  └─ auth.ts
│  ├─ models
│  │  ├─ auth.ts
│  │  ├─ device-info.ts
│  │  ├─ index.ts
│  │  └─ reservation.ts
│  ├─ routes
│  │  ├─ auth.ts
│  │  ├─ device.ts
│  │  ├─ page.ts
│  │  └─ reservation.ts
│  ├─ service
│  │  ├─ authService.ts
│  │  ├─ deviceinfoService.ts
│  │  └─ resetvationService.ts
│  └─ app.ts
├─ static
│  ├─ css
│  │  ├─ bootstrap.min.css
│  │  ├─ login.css
│  │  └─ style.css
│  ├─ data
│  │  └─ list.json
│  ├─ html
│  │  ├─ admin.ejs
│  │  ├─ device-add.ejs
│  │  ├─ device-edit.ejs
│  │  ├─ landing.ejs
│  │  └─ login.ejs
│  ├─ img
│  │  ├─ .DS_Store
│  │  ├─ device
│  │  │  └─ sample1.png
│  │  └─ olive_logo.png
│  └─ js
│     ├─ login.js
│     └─ script.js
├─ .babelrc
├─ .gitignore
├─ tsconfig.json
├─ webpack.config.js
├─ package-lock.json
├─ package.json
└─ README.md

```