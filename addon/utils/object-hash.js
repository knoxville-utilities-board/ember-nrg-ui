import Model from '@ember-data/model';
import { typeOf } from '@ember/utils';

export function isPrimitive(val) {
  return val !== Object(val);
}

export default function (object) {
  if (isPrimitive(object)) {
    return String(object);
  }

  const restore = overwriteToJSON(object);

  const hash = JSON.stringify(object);

  restore();

  return hash;
}

// This is only necessary as Ember models provide a custom toJSON
// implementation that is currently deprecated. Once it is removed
// from all supported versions of ember-data, this can be removed.
function overwriteToJSON(object) {
  const original = new Map();
  const leaves = new WeakSet();

  function restore() {
    for (const [key, value] of original.entries()) {
      key.toJSON = value;
    }
    original.clear();
  }

  try {
    replace(object, original, leaves);
  } catch (e) {
    restore();
    throw e;
  }

  return restore;
}

function replace(obj, original, leaves) {
  if (original.has(obj)) {
    return;
  }
  for (const key in obj) {
    if (leaves.has(obj[key])) {
      continue;
    }
    if (obj[key] instanceof Model) {
      original.set(obj[key], obj[key].toJSON);
      obj[key].toJSON = function () {
        return `(${this.toString()}:${this.id})`;
      };
    }
    if (!isPrimitive(obj[key])) {
      leaves.add(obj[key]);
    }
    if (typeOf(obj[key]) === 'object') {
      replace(obj[key], original, leaves);
    }
  }
}
