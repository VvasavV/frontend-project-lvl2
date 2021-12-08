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

gendiff-plain:
	node bin/gendiff.js -f plain __tests__/__fixtures__/file1.json __tests__/__fixtures__/file2.json

gendiff-json:
	node bin/gendiff.js -f json __tests__/__fixtures__/file1.json __tests__/__fixtures__/file2.json
