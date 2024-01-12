import { helper } from '@ember/component/helper';

export function listItemSelectable<T>([item, isSelectable]: [
  T,
  (item: T) => boolean
]) {
  return isSelectable?.(item) ?? true;
}

export default helper(listItemSelectable);
