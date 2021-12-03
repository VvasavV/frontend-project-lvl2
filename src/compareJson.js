import { readFileSync } from 'fs';
import * as path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const getDifferences = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);

  const getRecordComparisonResult = (key) => {
    if (!_.has(data1, key)) {
      return 'added';
    }
    if (!_.has(data2, key)) {
      return 'deleted';
    }
    if (data1[key] === data2[key]) {
      return 'unchanged';
    }
    return 'changed';
  };

  const getKeyValueString = (key, obj) => `${key}: ${_.get(obj, key)}`;
  const getAddedString = (key) => `+ ${getKeyValueString(key, data2)}`;
  const getDeletedString = (key) => `- ${getKeyValueString(key, data1)}`;
  const getUnchangedString = (key) => `  ${getKeyValueString(key, data1)}`;

  return keys
    .map((key) => [key, getRecordComparisonResult(key)])
    .sort()
    .reduce((acc, [key, comparisonResult]) => {
      switch (comparisonResult) {
        case 'added':
          return [...acc, getAddedString(key)];
        case 'deleted':
          return [...acc, getDeletedString(key)];
        case 'changed':
          return [...acc, getDeletedString(key), getAddedString(key)];
        default:
          return [...acc, getUnchangedString(key)];
      }
    }, [])
    .join('\n');
};

const compareFiles = (filepath1, filepath2) => {
  const fullPath1 = path.resolve(filepath1);
  const fullPath2 = path.resolve(filepath2);

  const fileContent1 = readFileSync(fullPath1);
  const fileContent2 = readFileSync(fullPath2);

  const extnameWithoutDot = (filePath) => path.extname(filePath).substring(1);

  const ext1 = extnameWithoutDot(filepath1);
  const ext2 = extnameWithoutDot(filepath2);

  const dataOld = parse(fileContent1, ext1);
  const dataNew = parse(fileContent2, ext2);

  return getDifferences(dataOld, dataNew);
};

export default compareFiles;
