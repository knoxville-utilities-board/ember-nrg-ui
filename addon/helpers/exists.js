import {
  helper
} from '@ember/component/helper';
import {
  isEmpty
} from '@ember/utils';

export function exists([array, item]) {
  return !isEmpty(array) && item && array.includes(item) || false;
}

export default helper(exists);
