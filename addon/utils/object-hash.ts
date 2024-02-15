import Model from '@ember-data/model';

let suppressDeprecations = false;

declare type DeprecationHandlerOptions = {
  id?: string;
  [key: string]: unknown;
};

export const deprecationHandler = function (
  message: string,
  options: DeprecationHandlerOptions | undefined,
  next: (message: string, options?: DeprecationHandlerOptions) => void
) {
  if (suppressDeprecations && options?.id === 'ember-data:model.toJSON') {
    return;
  }
  next(message, options);
};

export function isPrimitive(val: unknown) {
  return val !== Object(val);
}

export function stringHash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h;
}

export function objectHash<T>(object: T) {
  if (isPrimitive(object)) {
    return String(object);
  }
  suppressDeprecations = true;
  let hash;

  try {
    hash = JSON.stringify(object, function (key, value) {
      if (isPrimitive(value)) {
        return value;
      }
      if (value instanceof Model) {
        return `(${value.toString()}:${value.id})`;
      }
      return value;
    });
  } catch (e) {
    console.debug('error in object-hash', e);
  } finally {
    suppressDeprecations = false;
  }

  return hash;
}

export default objectHash;
