

targets: help

help:
	@awk -F '##' '/^[a-z_]+:[a-z ]+##/ { print "\033[34m"$$1"\033[0m" "\n" $$2 }' Makefile
build:
	docker-compose build
up: 
	docker-compose up

buildapi:
	openapi-generator-cli generate -i http://localhost:8000/api/openapi.json -g typescript-axios -o ./plant_tracker/frontend/src/services --additional-properties=withSeparateModelsAndApi=true,apiPackage=apis,modelPackage=models 

frontend:
	cd plant_tracker/frontend && npm run dev --host
done: lint test ## Prepare for a commit	



#npm run dev -- --host