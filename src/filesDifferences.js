import parseFile from './parseFile.js';
import dataDifferences from './dataDifferences.js';

const filesDifferences = (filePath1, filePath2) => {
  const dataOld = parseFile(filePath1);
  const dataNew = parseFile(filePath2);

  return dataDifferences(dataOld, dataNew);
};

export default filesDifferences;
