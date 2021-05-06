#!/bin/bash

source .env

DB_PASSWORD=${MYSQL_ROOT_PASSWORD}

source .env.test

docker exec -it database mysql -u root --password=${MYSQL_ROOT_PASSWORD} -e "CREATE DATABASE ${MYSQL_DATABASE};"
docker exec -it database mysql -u root --password=${MYSQL_ROOT_PASSWORD} -e "GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO ${MYSQL_USER};"

echo "DONE"