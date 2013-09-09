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

# Run server
server:
	@$(ENB) server

# Clean build results
clean:
	$(ENB) make clean

.PHONY: all npm validate lint test build server clean
