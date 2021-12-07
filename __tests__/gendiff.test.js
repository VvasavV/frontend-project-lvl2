import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import generateDifferences from '../src/generateDifferences';

const fileExtensions = ['json', 'yml'];
const formats = ['stylish', 'plain'];

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFilepaths = () => fileExtensions.map((ext) => [
  path.resolve(dirname, `__fixtures__/file1.${ext}`),
  path.resolve(dirname, `__fixtures__/file2.${ext}`),
]);

const getResultPath = (format) => path.resolve(dirname, `__fixtures__/${format}Result.txt`);

test.each(getFilepaths())(
  'compareFiles',
  (oldFilePath, newFilePath) => {
    formats.forEach((format) => {
      const actual = generateDifferences(oldFilePath, newFilePath, format);

      const expected = readFileSync(getResultPath(format), 'utf8');

      expect(actual).toBe(expected);
    });
  },
);
