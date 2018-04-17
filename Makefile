

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
`
run:
	find . -name \*.pyc -delete
	python run.py

run-docker:
	docker run --expose $(PORT) -p $(PORT):$(PORT) $(IMAGE_NAME) 

install: libs requirements node_modules

sync:
	browser-sync start --no-notify --reload-delay=3000 --proxy "wb-games.io:5001" --files="./client/templates,./application/static/dist"

# Build Steps
# -------------------
clean:
	@echo "Cleaning..."
	@-find . -name \*.pyc -delete
	@-rm -r node_modules
	@-rm -r application/static/dist


client-docker:
	@-rm -r application/static/dist
	@-mkdir -p application/static/dist
	@echo "Launch container to build js and css..."
	@docker build --quiet -f Dockerfile.build -t build-container .
	@docker run -v  "${CURDIR}/application/static/dist:/build/application/static/dist" build-container
	@echo "...client code written to client/static/dist"


# Build client locally
# -------------------
client:
	mkdir -p application/static/dist/
	stylus -u nib client/styles/style.styl -o application/static/dist/style.css
	browserify --debug client/app/application.jsx -t babelify -t pugify -o application/static/dist/application.jsx -v

# production-client:
# 	mkdir -p application/static/dist/
# 	stylus -u nib client/styles/style.styl -o application/static/dist/style.css
# 	browserify client/app/application.jsx \
# 		-t babelify \
# 		-g [ envify --NODE_ENV production ] \
# 		-g uglifyify \
# 		-p bundle-collapser/plugin \
# 		| uglifyjs --compress --mangle > application/static/dist/application.jsx

watch:
	stylus -u nib -w client/styles/style.styl -o application/static/dist/style.css &
	watchify --debug client/app/application.jsx -t babelify -o application/static/dist/application.jsx -v --poll=3000 &

# Target for the static dir
application/static/dist: client

libs:
	@sudo apt-get install libffi-dev libssl-dev python-dev libsasl2-dev libldap2-dev python-pip
ifneq (,$(findstring ./node_modules/.bin,${PATH}))
	@echo "PATH is fine, no changes made"
else
	$(error PATH missing node_modules, PLEASE FIX MANUALLY by running:   'export PATH=$$PATH:./node_modules/.bin')
endif

pip:
	@echo "////////////////////////////////"
	@echo "DID YOU INSTALL THE BUILD LIBRARIES?"
	@echo "libffi-dev libssl-dev python-dev libsasl2-dev libldap2-dev python-pip"
	@echo "////////////////////////////////"
	@sudo pip install -r requirements.txt

node_modules:
	@npm install


#jsdoc client/app/dashboard.jsx README.md

#.PHONY: run build build-docker client help Makefile


#///////////////////
# If you want to build the web based docs, uncomment this, install sphinx,
# type `make html` and look for index.html in the output dir
#///////////////////
#

# You can set these variables from the command line.
# SPHINXOPTS    =
# SPHINXBUILD   = sphinx-build
# SPHINXPROJ    = Application
# SOURCEDIR     = ./docs/
# BUILDDIR      = _build

# Put it first so that "make" without argument is like "make help".
# help:
# 	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
# %: Makefile
# 	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
