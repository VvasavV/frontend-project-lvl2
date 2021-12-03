import _ from 'lodash';

const dataDifferences = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);

  const keys = _.union(keys1, keys2);

  const diffs = keys
    .reduce((acc, key) => {
      if (!_.has(data1, key)) {
        return [...acc, { key, status: 'added', value: data2[key] }];
      }
      if (!_.has(data2, key)) {
        return [...acc, { key, status: 'deleted', value: data1[key] }];
      }
      if (data1[key] === data2[key]) {
        return [...acc, { key, status: 'unchanged', value: data1[key] }];
      }
      return [...acc, { key, status: 'deleted', value: data1[key] }, { key, status: 'added', value: data2[key] }];
    }, []);

  return _.sortBy(diffs, ['key']);
};

export default dataDifferences;
