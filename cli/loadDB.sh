#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR/../appwrite

docker-compose exec -T mariadb sh -c 'exec mysql -uroot -p"rootsecretpassword"' < dump.sql