import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import { isArray as emberIsArray } from '@ember/array';

export function exists([array, item]) {
  const isArray = emberIsArray(array);
  return (
    (!isEmpty(array) &&
      item &&
      (isArray ? array.includes(item) : array === item)) ||
    false
  );
}

export default helper(exists);
