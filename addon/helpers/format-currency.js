import { helper } from '@ember/component/helper';
import { formatNumber } from './format-number';
import unformat from './unformat';

export function formatCurrency(value) {
  const formattedValue = formatNumber(value, 2);
  return unformat(value) < 0 ? '($' + formattedValue + ')' : '$' + formattedValue;
}

export default helper(([value]) => {
  return formatCurrency(value);
});
