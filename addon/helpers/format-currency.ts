import { helper } from '@ember/component/helper';
import { formatNumber } from './format-number';
import unformat from './unformat';

export function formatCurrency(value: number | string, precision = 2): string {
  const formattedValue = formatNumber(value, precision);
  return unformat(value) < 0
    ? '($' + formattedValue + ')'
    : '$' + formattedValue;
}

export default helper(
  ([value]: [string | number], { precision }: { precision: number }) => {
    return formatCurrency(value, precision);
  }
);
