import {
  helper
} from '@ember/component/helper';
import {
  A
} from '@ember/array';

export function exists([items, i, groupHeaderHandler]) {
  const item = A(items).objectAt(i);

  if (i === 0) {
    return groupHeaderHandler(item);
  }

  const previousItem = A(items).objectAt(i - 1);
  const previousGroupHeaderLabel = groupHeaderHandler(previousItem);
  const label = groupHeaderHandler(item);
  if (previousGroupHeaderLabel !== label) {
    return label;
  }
  return '';
}

export default helper(exists);
