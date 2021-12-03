import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import compareJson from '../src/compareJson';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const file1Path = path.resolve(dirname, '__fixtures__/file1.json');
const file2Path = path.resolve(dirname, '__fixtures__/file2.json');
const resultPath = path.resolve(dirname, '__fixtures__/result.txt');

test('compareJson', () => {
  expect(compareJson(file1Path, file2Path)).toBe(readFileSync(resultPath, 'utf8'));
});
