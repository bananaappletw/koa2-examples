lint:
	@./node_modules/.bin/semistandard --env mocha

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--compilers js:babel-core/register \
		--require babel-polyfill \
		--harmony \
		--reporter spec \
		--require should \
		*/test.js

.PHONY: lint test
