lint:
	@./node_modules/.bin/semistandard --env mocha

test:
	@NODE_ENV=test node ./node_modules/.bin/_mocha \
		--compilers babel-core/register \
		--require babel-polyfill \
		--harmony \
		--reporter spec \
		--require should \
		*/test.js

.PHONY: lint test
