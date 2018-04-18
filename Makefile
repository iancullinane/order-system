

IMAGE_NAME ?= application-local
NAME ?= application-container
PORT ?= 5003

#
# The `all` target is just for producing an image from the meta project
#
all: clean client-docker
	@echo ""
	@echo "Build container ${NAME} in ${ENVIRONMENT}"
	@echo ""
	docker build --build-arg ENVIRONMENT_VARIABLE=${ENVIRONMENT} \
		--build-arg PORT=$(PORT) \
		-t ${IMAGE_NAME} .
	@echo "${IMAGE_NAME} Was created from project ${NAME}"


build: client

run:
	find . -name \*.pyc -delete
	python run.py

run-docker:
	docker run --expose $(PORT) -p $(PORT):$(PORT) $(IMAGE_NAME) 

install: node_modules

# Build Steps
# -------------------
clean:
	@echo "Cleaning..."
	@-find . -name \*.pyc -delete
	@-rm -r node_modules
	@-rm -r application/static/dist

node_modules:
	@npm install

