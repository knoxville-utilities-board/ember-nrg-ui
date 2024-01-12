import Helper from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';

function coerceArray<T>(value: T | T[]): T[] {
  if (isArray(value)) {
    return value as unknown as T[];
  }
  return [value];
}

export declare type HashFn<T> = (item: T) => string | number | symbol;

export default class ExistsHelper<T> extends Helper {
  compute(
    [array, item]: [Array<T>, T],
    { hash }: { hash: HashFn<T> }
  ): boolean {
    const coercedArray = coerceArray(array);
    if (hash) {
      const itemHash = hash(item);
      return coercedArray.some((arrayItem) => {
        const arrayItemHash = hash(arrayItem);
        return itemHash === arrayItemHash;
      });
    }
    return (!isEmpty(array) && item && coercedArray.includes(item)) || false;
  }
}
