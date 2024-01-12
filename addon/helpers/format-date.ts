import { helper } from '@ember/component/helper';
import dayjs from 'dayjs';

export function formatDate(
  [date, format]: [string, string],
  { type }: { type: string }
) {
  if (!date) {
    return '';
  }
  let outputFormat = 'L LT';
  if (format) {
    outputFormat = format;
  } else if (type === 'date') {
    outputFormat = 'L';
  } else if (type === 'time') {
    outputFormat = 'LT';
  }
  return dayjs(date).format(outputFormat);
}

export default helper(formatDate);
