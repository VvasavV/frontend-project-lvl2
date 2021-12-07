import _ from 'lodash';

const dataDifferences = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);

  const keys = _.union(keys1, keys2);

  const diffs = keys
    .reduce((acc, key) => {
      const value1 = data1[key];
      const value2 = data2[key];

      const added = {
        key,
        status: 'added',
        type: value2 instanceof Object ? 'object' : 'value',
        value: value2 instanceof Object ? dataDifferences(value2, value2) : value2,
      };

      const deleted = {
        key,
        status: 'deleted',
        type: value1 instanceof Object ? 'object' : 'value',
        value: value1 instanceof Object ? dataDifferences(value1, value1) : value1,
      };

      const unchanged = {
        key,
        status: 'unchanged',
        type: value1 instanceof Object && value2 instanceof Object ? 'object' : 'value',
        value: value1 instanceof Object && value2 instanceof Object
          ? dataDifferences(value1, value2)
          : value1,
      };

      const updated = {
        key,
        status: 'updated',
        value: { added, deleted },
      };

      const has1 = _.has(data1, key);
      const has2 = _.has(data2, key);

      if ((value1 instanceof Object && value2 instanceof Object) || value1 === value2) {
        return [...acc, unchanged];
      }
      if (!has2) {
        return [...acc, deleted];
      }
      if (!has1) {
        return [...acc, added];
      }
      return [...acc, updated];
    }, []);

  return _.sortBy(diffs, ['key']);
};

export default dataDifferences;
