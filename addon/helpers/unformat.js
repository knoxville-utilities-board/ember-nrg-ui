export default function unformat(value) {
  value = value ?? 0;
  if (typeof value === 'number') {
    return value;
  }

  // Build regex to strip out everything except digits, decimal point and minus sign:
  const regex = /[^0-9-.]/g;
  const unformatted = parseFloat(
    ('' + value)
      .replace(/\((.*)\)/, '-$1') // replace bracketed values with negatives
      .replace(regex, '') // strip out any cruft
  );

  // This will fail silently which may cause trouble, let's wait and see:
  return !isNaN(unformatted) ? unformatted : 0;
}
