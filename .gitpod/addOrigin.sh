#!/usr/bin/env bash

url=`gp url 3000`
hostname="${url:8}"
cd $GITPOD_REPO_ROOT/appwrite
docker-compose exec -e hostname=$hostname -T mariadb sh -c 'exec mysql -uroot -p"rootsecretpassword" appwrite -e "INSERT INTO _console_platforms VALUES (99,'"'6260031cb459b83f1490'"','"'6260030f877ddd7cb032'"','"'web'"','"'web'"','"''"','"''"','"'$hostname'"',1650459420,1650459420)"'
docker-compose exec -T mariadb sh -c 'exec mysql -uroot -p"rootsecretpassword" appwrite -e "INSERT INTO _console_platforms_perms VALUES (99,'"'read'"','"'role:all'"','"'6260031cb459b83f1490'"'), (100,'"'write'"','"'role:all'"','"'6260031cb459b83f1490'"');"'
docker-compose exec -T redis redis-cli del cache-_console:projects:6260030f877ddd7cb032