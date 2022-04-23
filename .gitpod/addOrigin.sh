url=`gp url 3000`
hostname="${url:8}"
cd /workspace/appwrite/appwrite
docker-compose exec -e hostname=$hostname -T mariadb sh -c 'exec mysql -uroot -p"rootsecretpassword" appwrite -e "INSERT INTO _console_platforms VALUES (2,'"'6260031cb459b83f1480'"','"'6260030f877ddd7cb032'"','"'web'"','"'web'"','"''"','"''"','"'$hostname'"',1650459420,1650459420)"'
docker-compose exec -T mariadb sh -c 'exec mysql -uroot -p"rootsecretpassword" appwrite -e "INSERT INTO _console_platforms_perms VALUES (3,'"'read'"','"'role:all'"','"'6260031cb459b83f1480'"'), (4,'"'write'"','"'role:all'"','"'6260031cb459b83f1480'"');"'
docker-compose exec -T redis redis-cli del cache-_console:projects:6260030f877ddd7cb032
endpointUrl=`gp url 8080`
sed -i -E "s|(NEXT_PUBLIC_ENDPOINT=).*|\1$endpointUrl|" /workspace/appwrite/.env.local