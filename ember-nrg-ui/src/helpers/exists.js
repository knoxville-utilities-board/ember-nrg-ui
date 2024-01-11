import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';

function ensureArray(value) {
  if (isArray(value)) {
    return value;
  }
  return [value];
}

export function exists([array, item], { hash }) {
  array = ensureArray(array);
  if (hash) {
    const itemHash = hash(item);
    return array.some((arrayItem) => {
      const arrayItemHash = hash(arrayItem);
      return itemHash === arrayItemHash;
    });
  }
  return (!isEmpty(array) && item && array.includes(item)) || false;
}

export default helper(exists);
