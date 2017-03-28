lint:
	@./node_modules/.bin/eslint .

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require babel-polyfill \
		--compilers js:babel-register \
		--harmony \
		--reporter spec \
		--require should \
		*/test.js

.PHONY: lint test
