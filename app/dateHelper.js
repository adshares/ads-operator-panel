import moment from 'moment';
import config from 'config';

export function formatDate(value) {
  const date = moment.parseZone(value);
  return date.format(config.date_format);
}
