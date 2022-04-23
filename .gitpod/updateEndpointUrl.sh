endpointUrl=`gp url 8080`/v1
sed -i -E "s|(NEXT_PUBLIC_ENDPOINT=).*|\1$endpointUrl|" /workspace/appwrite/.env.local