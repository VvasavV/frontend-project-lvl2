import dataDifferences from './dataDifferences.js';

const dataDifferencesPresentation = (data1, data2) => {
  const statusPrefix = (status) => {
    switch (status) {
      case 'deleted':
        return '- ';
      case 'added':
        return '+ ';
      default:
        return '  ';
    }
  };

  const diffStrings = dataDifferences(data1, data2)
    .map((diff) => `${statusPrefix(diff.status)}${diff.key}: ${diff.value}`)
    .map((str) => `${' '.repeat(2)}${str}`)
    .join('\n');

  return `{\n${diffStrings}\n}`;
};

export default dataDifferencesPresentation;
