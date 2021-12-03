install:
	npm ci

publish:
	npm publish --dry-run

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

gendiff:
	node bin/gendiff.js __tests__/__fixtures__/file1.json __tests__/__fixtures__/file2.json
