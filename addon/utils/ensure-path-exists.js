export default function ensurePathExists(object, path) {
  const keys = path.split?.('.');
  _ensurePathExists(object, keys);
}

const _ensurePathExists = (object, keys) => {
  const key = keys?.[0];
  const nextKey = keys?.[1];

  if (!key || !nextKey) {
    return;
  }

  if (typeof object[key] === 'undefined') {
    const index = parseInt(nextKey);
    const isArray = Number.isInteger(index);

    if (isArray) {
      object[key] = [];
      object[key][index] = {};
      _ensurePathExists(object[key][index], keys.slice(2));
      return;
    }

    object[key] = {};
  }

  _ensurePathExists(object[key], keys.slice(1));
};
