import Model from '@ember-data/model';

export function isPrimitive(val) {
  return val !== Object(val);
}

export default function (object) {
  return JSON.stringify(object, function (key) {
    if (isPrimitive(value)) {
      return String(value);
    }
    const value = this[key];
    if (value instanceof Object) {
      serializeModels(value);
      return JSON.stringify(value);
    }
    return value;
  });
}

function serializeModels(obj) {
  for (const key in obj) {
    const val = obj[key];
    if (val instanceof Model) {
      obj[key] = `(${val.toString()}:${val.id})`;
    }
    if (String(val) === '[object Object]') {
      serializeModels(val);
    }
  }
}
