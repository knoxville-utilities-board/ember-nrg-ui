import { helper } from '@ember/component/helper';
import unformat from './unformat';

function isDecimalNumber(value) {
  return value % 1 !== 0;
}

export function formatNumber(value = 0, precision = 0) {
  value = unformat(value + '');
  const absoluteValue = Math.abs(value);
  let formattedValue = absoluteValue + '';
  let decimals = '';
  if (precision !== undefined || isDecimalNumber(value)) {
    formattedValue = absoluteValue.toFixed(precision);
    const splits = formattedValue.split('.');
    if (splits.length == 2) {
      formattedValue = splits[0];
      decimals = `.${splits[1]}`;
    }
  }

  while (/(\d+)(\d{3})/.test(formattedValue)) {
    formattedValue = formattedValue.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
  }

  formattedValue = formattedValue + decimals;

  return formattedValue;
}

export function numberFormatter([value, precision]) {
  const formattedValue = formatNumber(value, precision);
  return unformat(value) < 0 ? '-' + formattedValue : formattedValue;
}

export default helper(numberFormatter);
