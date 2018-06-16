

IMAGE_NAME ?= sweet-basil-pesto
ENVIRONMENT ?= dev
NAME ?= $(IMAGE_NAME)-$(ENVIRONMENT)
PORT ?= 5003

#
# The `all` target is just for producing an image from the meta project
#
all: clean
	@echo ""
	@echo "Build container ${NAME} in ${ENVIRONMENT}"
	@echo ""
	docker build --build-arg ENVIRONMENT_VARIABLE=${ENVIRONMENT} \
		--build-arg PORT=$(PORT) \
		-t ${IMAGE_NAME} .
	@echo "${IMAGE_NAME} Was created from project ${NAME}"


build: 
	go build -o $(NAME)

run: go-build
	$(NAME)

run-docker:
	docker run --expose $(PORT) -p $(PORT):$(PORT) $(IMAGE_NAME) 

install: node_modules

webpack:
	webpack
# Build Steps
# -------------------
clean:
	@echo "Cleaning..."
	@-rm -r node_modules
	@-rm -r dist
	@-rm $(NAME)

node_modules:
	@npm install

