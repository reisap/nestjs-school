start:
	docker-compose up
stop:
	docker-compose down
rmi:
	docker image rmi nestjs-socialmedia
.PHONY: start stop rmi