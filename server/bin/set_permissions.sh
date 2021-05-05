#!/bin/bash

source .env

DB_PASSWORD=${MYSQL_ROOT_PASSWORD}

source .env.test

docker exec -it server_db_1 mysql -u root --password=${MYSQL_ROOT_PASSWORD} -e "CREATE DATABASE ${MYSQL_DATABASE};"
docker exec -it server_db_1 mysql -u root --password=${MYSQL_ROOT_PASSWORD} -e "GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO ${MYSQL_USER};"

echo "DONE"