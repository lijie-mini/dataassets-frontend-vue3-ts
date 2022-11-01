#!/bin/sh
echo "building home-service============================================="
npm run build
echo "home-service builded============================================="

rm -rf docker/home-service
mv -f web_home_service docker/home-service
echo "building docker image============================================="
cd docker
#docker build -t harbor.supwisdom.com/platform-dataassets/web_home_service:1.1.0 .
docker build --build-arg PROJECT_NAME="home-service" -t harbor.ds.supwisdom.com/dataassets_service/web_home_service:SNAPSHOT .
echo "pushing docker image============================================="
#docker push harbor.supwisdom.com/platform-dataassets/web_home_service:1.1.0
docker push harbor.ds.supwisdom.com/dataassets_service/web_home_service:SNAPSHOT
echo "completed============================================="

