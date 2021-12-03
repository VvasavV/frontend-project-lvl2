import * as path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';

const parseFile = (filePath) => {
  const fullPath = path.resolve(filePath);
  const fileContent = readFileSync(fullPath);
  const ext = path.extname(filePath).substring(1);

  return parse(fileContent, ext);
};

export default parseFile;
