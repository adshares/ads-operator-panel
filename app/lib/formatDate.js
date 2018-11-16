import moment from 'moment';
import config from 'config';

export default function(value) {
  if (!moment(value, moment.ISO_8601).isValid()) {
    return null;
  }

  const date = moment(value);
  return date.format(config.date_format);
}
