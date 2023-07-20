import { helper } from '@ember/component/helper';
import { formatNumber } from './format-number';
import unformat from './unformat';

export function formatCurrency(value, precision = 2) {
  const formattedValue = formatNumber(value, precision);
  return unformat(value) < 0
    ? '($' + formattedValue + ')'
    : '$' + formattedValue;
}

export default helper(([value], { precision }) => {
  return formatCurrency(value, precision);
});
