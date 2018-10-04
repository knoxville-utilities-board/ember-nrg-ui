import {
  helper
} from '@ember/component/helper';

export function listItemSelectable([item, isSelectable]) {
  return isSelectable(item);
}

export default helper(listItemSelectable);
