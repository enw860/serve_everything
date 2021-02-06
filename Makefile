#!/bin/bash

.PHONY: launch build_volume build_image clean_volume clean_containers clean_image

PORT=8080
IMAGE_NAME=my_project
VOLUME_NAME=my_project_db
CONTAINER_NAME=my_project_runtime

build: build_image
rebuild: clean_containers build_image
clean: clean_containers clean_image
clean_alter: clean_image
relaunch: clean_containers launch

launch:
	docker run \
		-d \
		-v ${VOLUME_NAME}:/usr/src/app/server/database/DB \
		-p 8080:${PORT} \
		-e SENDGRID_FROM_EMAIL=${SENDGRID_FROM_EMAIL} \
		-e SENDGRID_API_KEY=${SENDGRID_API_KEY} \
		--name ${CONTAINER_NAME} \
		${IMAGE_NAME}

inspect_volume:
	docker run \
		-it --rm \
		-v ${VOLUME_NAME}:/DB \
		dockerpinata/sqlite

build_volume:
	echo "Creating volume `docker volume create ${VOLUME_NAME}`!"

build_image:
	docker build -t ${IMAGE_NAME} .

clean_volume:
	echo "Removing pre-existed volume `docker volume rm ${VOLUME_NAME}`!"

clean_containers:
	docker rm -f `docker container ls -a | grep ${IMAGE_NAME} | sed | awk '{print $$1}'`

clean_image:
	docker image rm -f `docker images -a | grep ${IMAGE_NAME} | sed | awk '{print $$3}'`
