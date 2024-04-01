import Model from '@ember-data/model';

let suppressDeprecations = false;

export const deprecationHandler = function (message, options, next) {
  if (suppressDeprecations && options?.id === 'ember-data:model.toJSON') {
    return;
  }
  next(message, options);
};

export function isPrimitive(val) {
  return val !== Object(val);
}

export function stringHash(s) {
  let h;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h;
}

export default function (object) {
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
