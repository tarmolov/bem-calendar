NPM_BIN = node_modules/.bin
ENB = $(NPM_BIN)/enb

all: npm server

# Install npm modules
npm:
	@npm install

validate: lint test

# Lint js files
lint:
	@$(NPM_BIN)/jshint-groups
	@$(NPM_BIN)/jscs .

# Sort css properties
csscomb:
	@$(NPM_BIN)/csscomb .

# Build and run tests
test:
	$(ENB) make test -n
	$(NPM_BIN)/mocha-phantomjs $(MOCHA_FLAGS) test/test.html

# Build project
build:
	YENV=$(YENV) $(ENB) make

# Deploy application to gh-pages
deploy:
	YENV=production make build
	git clone -b gh-pages git@github.com:tarmolov/bem-calendar.git deploy && cd deploy && rm -rf *
	rsync -avz --stats --include "*.html" --include "_*.css" --include "_*.js" pages/ deploy/pages
	rsync -avz --stats i/ deploy/i
	cd deploy && git add -A && git commit -m "update doc" && git push origin gh-pages
	rm -rf deploy
	rm -rf i

# Run server
server:
	@$(ENB) server

# Clean build results
clean:
	$(ENB) make clean

.PHONY: all npm validate lint test build server clean
