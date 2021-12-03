import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import filesDifferencesPresentation from '../src/filesDifferencesPresentation.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const fileExtensions = ['json', 'yml'];

const getOldFilePath = (ext) => path.resolve(dirname, `__fixtures__/file1.${ext}`);
const getNewFilePath = (ext) => path.resolve(dirname, `__fixtures__/file2.${ext}`);

const resultPath = path.resolve(dirname, '__fixtures__/result.txt');

test.each(fileExtensions)(
  'compareFiles',
  (ext) => {
    const oldFilePath = getOldFilePath(ext);
    const newFilePath = getNewFilePath(ext);

    expect(filesDifferencesPresentation(oldFilePath, newFilePath)).toBe(readFileSync(resultPath, 'utf8'));
  },
);
