import parseFile from './parseFile.js';
import dataDifferences from './dataDifferences.js';
import dataDifferencesPresentation from './dataDifferencesPresentation.js';

const filesDifferencesPresentation = (filePath1, filePath2) => {
  const dataOld = parseFile(filePath1);
  const dataNew = parseFile(filePath2);

  const differences = dataDifferences(dataOld, dataNew);

  return dataDifferencesPresentation(differences);
};

export default filesDifferencesPresentation;
