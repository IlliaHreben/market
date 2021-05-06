# ROOM4

# Dependencies
1. npm
2. node v14
3. docker-compose

# Instructions

## Run in Docker-compose
```bash
cp ./server/.env.sample ./server/.env
docker-compose up --build
```
## Local run - for development
```bash
cd server
npm i
cp .env.sample .env
docker-compose -f docker-development.yml up -d
npm start
```

## Local run - for tests
```bash
cd server
npm i
cp .env.test.sample .env.test
docker-compose -f docker-test.yml up -d
./bin/set_permissions.sh
npm run start:test
npm test
```
