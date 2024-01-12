import { helper } from '@ember/component/helper';
import unformat from './unformat';

function isDecimalNumber(value: number) {
  return value % 1 !== 0;
}

export function formatNumber(value: number | string | undefined, precision = 0): string {
  value = unformat(value + '');
  const absoluteValue = Math.abs(value);
  let formattedValue: string = absoluteValue + '';
  let decimals = '';
  if (precision !== undefined || isDecimalNumber(value)) {
    formattedValue = absoluteValue.toFixed(precision);
    const splits = formattedValue.split('.');
    if (splits.length == 2) {
      formattedValue = splits[0] as string;
      decimals = `.${splits[1]}`;
    }
  }

  while (/(\d+)(\d{3})/.test(formattedValue)) {
    formattedValue = formattedValue.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
  }

  formattedValue = formattedValue + decimals;

  return formattedValue;
}

export function numberFormatter([value, precision]: [number, number]) {
  const formattedValue = formatNumber(value, precision);
  return unformat(value) < 0 ? '-' + formattedValue : formattedValue;
}

export default helper(numberFormatter);
