import Model from '@ember-data/model';

let suppressDeprecations = false;

export const deprecationHandler = function (message, options, next) {
  if (suppressDeprecations) {
    return;
  }
  next(message, options);
};

export function isPrimitive(val) {
  return val !== Object(val);
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
