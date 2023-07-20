import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import Duration from 'dayjs/plugin/duration';
import IsBetween from 'dayjs/plugin/isBetween';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import ObjectSupport from 'dayjs/plugin/objectSupport';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Timezone from 'dayjs/plugin/timezone';
import UTC from 'dayjs/plugin/utc';
import Weekday from 'dayjs/plugin/weekday';

export function initialize() {
  dayjs.extend(CustomParseFormat);
  dayjs.extend(Duration);
  dayjs.extend(IsBetween);
  dayjs.extend(IsSameOrAfter);
  dayjs.extend(IsSameOrBefore);
  dayjs.extend(LocalizedFormat);
  dayjs.extend(ObjectSupport);
  dayjs.extend(RelativeTime);
  dayjs.extend(Timezone);
  dayjs.extend(UTC);
  dayjs.extend(Weekday);
}

export default {
  initialize,
};
