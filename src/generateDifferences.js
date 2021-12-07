import parseFile from './parseFile.js';
import dataDifferences from './dataDifferences.js';
import render from './formatters/index.js';

const generateDifferences = (filePath1, filePath2, format) => {
  const dataOld = parseFile(filePath1);
  const dataNew = parseFile(filePath2);

  const differences = dataDifferences(dataOld, dataNew);

  return render(differences, format);
};

export default generateDifferences;
