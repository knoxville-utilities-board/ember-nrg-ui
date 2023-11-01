export function isPrimitive(val) {
  return val !== Object(val);
}

export default function (object) {
  if (isPrimitive(object)) {
    return String(object);
  }
  if (object.toString) {
    return object.toString();
  }
  return object;
}
