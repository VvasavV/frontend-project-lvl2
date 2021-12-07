import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import parseFile from '../src/parseFile';
import dataDifferences from '../src/dataDifferences';
import render from '../src/formatters/index.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const fileExtensions = ['json', 'yml'];

const getOldFilePath = (ext) => path.resolve(dirname, `__fixtures__/file1.${ext}`);
const getNewFilePath = (ext) => path.resolve(dirname, `__fixtures__/file2.${ext}`);

const getResultPath = (format) => path.resolve(dirname, `__fixtures__/${format}Result.txt`);

const format = 'stylish';

test.each(fileExtensions)(
  'compareFiles',
  (ext) => {
    const oldFilePath = getOldFilePath(ext);
    const newFilePath = getNewFilePath(ext);
    const resultPath = getResultPath(format);

    const dataOld = parseFile(oldFilePath);
    const dataNew = parseFile(newFilePath);

    const differences = dataDifferences(dataOld, dataNew);

    const actual = render(differences, format);
    const expected = readFileSync(resultPath, 'utf8');

    expect(actual).toBe(expected);
  },
);
