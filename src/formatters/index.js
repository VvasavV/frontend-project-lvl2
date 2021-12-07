import plain from './plain.js';
import stylish from './stylish.js';

const formatters = {
  stylish,
  plain,
};

export default (diff, format = 'stylish') => formatters[format](diff);
