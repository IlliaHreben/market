#!/bin/bash

source ../.env

DB_PASSWORD=${MYSQL_ROOT_PASSWORD}

source ../.env.test

docker exec -i server_db_1 mysql -u root --password=${MYSQL_ROOT_PASSWORD} --host ${APP_DB_HOST} -e "CREATE DATABASE ${MYSQL_DATABASE};"
docker exec -i server_db_1 mysql -u root --password=${MYSQL_ROOT_PASSWORD} --host ${APP_DB_HOST} -e "GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO ${MYSQL_USER};"

echo "DONE"