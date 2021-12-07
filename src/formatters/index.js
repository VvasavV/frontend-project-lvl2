import stylish from "./stylish.js";

const formatters = {
  stylish: stylish,
}

export default (diff, format = 'stylish') => formatters[format](diff);
