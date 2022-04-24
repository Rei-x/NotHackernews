#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR/../appwrite

docker-compose exec mariadb sh -c 'exec mysqldump --all-databases --add-drop-database -u"root" -p"rootsecretpassword"' > ./dump.sql