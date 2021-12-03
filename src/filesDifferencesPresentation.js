import parseFile from './parseFile.js';
import dataDifferencesPresentation from './dataDifferencesPresentation.js';

const filesDifferencesPresentation = (filePath1, filePath2) => {
  const dataOld = parseFile(filePath1);
  const dataNew = parseFile(filePath2);

  return dataDifferencesPresentation(dataOld, dataNew);
};

export default filesDifferencesPresentation;
