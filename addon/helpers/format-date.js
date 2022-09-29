import { helper } from '@ember/component/helper';
import dayjs from 'dayjs';

export function formatDate([date, format], { type }) {
  if (!date) {
    return '';
  }
  let outputFormat = 'L LT';

  if (!dayjs(date).hour() && !dayjs(date).minute()) {
    outputFormat = 'L';
  }
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
