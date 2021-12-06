const dataDifferencesPresentation = (differences) => {
  const getReplacers = (depth) => '  '.repeat(depth);

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

  const diffStrings = (diffs, depth) => {
    const replacersBeforeDiff = getReplacers(depth);
    const replacersBeforeCloseBracket = getReplacers(depth - 1);

    const lines = diffs
      .map((diff) => {
        const status = statusPrefix(diff.status);
        const value = (diff.type !== 'object' ? diff.value : `${diffStrings(diff.value, depth + 2)}`);

        return `${replacersBeforeDiff}${status}${diff.key}: ${value}`;
      });

    return ['{', ...lines, `${replacersBeforeCloseBracket}}`].join('\n');
  };

  return diffStrings(differences, 1);
};

export default dataDifferencesPresentation;
