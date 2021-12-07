const plain = (differences) => {
  const diffStrings = (diffs, path = '') => diffs.reduce((acc, diff) => {
    const {
      key, type, value, status,
    } = diff;

    const propertyPath = path === '' ? key : `${path}.${key}`;

    function diffValue(obj) {
      if (obj.type === 'object') {
        return '[complex value]';
      }
      return obj.value === obj.value?.toString() ? `'${obj.value}'` : obj.value;
    }

    switch (status) {
      case 'deleted':
        return [...acc, `Property '${propertyPath}' was removed`];
      case 'added':
        return [...acc, `Property '${propertyPath}' was added with value: ${diffValue(diff)}`];
      case 'updated':
        return [...acc, `Property '${propertyPath}' was updated. From ${diffValue(value.deleted)} to ${diffValue(value.added)}`];
      case 'unchanged':
        return type === 'object' ? [...acc, ...diffStrings(value, propertyPath)] : acc;
      default:
        return acc;
    }
  }, []);

  return diffStrings(differences).join('\n');
};

export default plain;
