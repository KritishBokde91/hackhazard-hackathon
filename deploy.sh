#!/bin/bash
git pull
docker-compose down
docker-compose up --build -d
echo "last deploy\n" > last-deploy.txt
date >> last-deploy.txt
