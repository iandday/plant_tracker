export PROJECT=plant_tracker_api

targets: help

help:
	@awk -F '##' '/^[a-z_]+:[a-z ]+##/ { print "\033[34m"$$1"\033[0m" "\n" $$2 }' Makefile
build:
	docker-compose build
up: 
	docker-compose up

makemigrations:
	docker-compose run api alembic revision --autogenerate -m "migration"

migrate:
	docker-compose run api alembic upgrade head 

buildapi:
	openapi-generator-cli generate -i http://localhost:8000/api/openapi.json -g typescript-axios -o ./frontend/src/services --additional-properties=withSeparateModelsAndApi=true,apiPackage=apis,modelPackage=models 

done: lint test ## Prepare for a commit	



#npm run dev -- --host