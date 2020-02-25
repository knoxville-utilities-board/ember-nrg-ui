import { helper } from '@ember/component/helper';
import unformat from './unformat';

function isDecimalNumber(value) {
  return value % 1 !== 0;
}

export function formatNumber(value = 0, decimalPlaces = 0) {
  value = unformat(value + '');
  const absoluteValue = Math.abs(value);
  let formattedValue = absoluteValue + '';
  if (decimalPlaces !== undefined || isDecimalNumber(value)) {
    formattedValue = absoluteValue.toFixed(decimalPlaces);
  }
  while (/(\d+)(\d{3})/.test(formattedValue)) {
    formattedValue = formattedValue.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
  }
  return formattedValue;
}

export function numberFormatter([value, decimal]) {
  const formattedValue = formatNumber(value, decimal);
  return unformat(value) < 0 ? '-' + formattedValue : formattedValue;
}

export default helper(numberFormatter);
