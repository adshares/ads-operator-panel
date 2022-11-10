/*
 * Pagination Messages
 *
 * This contains all the text for the Pagination component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  current: {
    id: 'app.components.Pagination.current',
    defaultMessage: 'Page {page} of {total}',
  },
  first: {
    id: 'app.components.Pagination.first',
    defaultMessage: 'First',
  },
  last: {
    id: 'app.components.Pagination.last',
    defaultMessage: 'Last',
  },
  previous: {
    id: 'app.components.Pagination.previous',
    defaultMessage: '‹',
  },
  next: {
    id: 'app.components.Pagination.next',
    defaultMessage: '›',
  },
  previousBatch: {
    id: 'app.components.Pagination.previousBatch',
    defaultMessage: '«',
  },
  nextBatch: {
    id: 'app.components.Pagination.nextBatch',
    defaultMessage: '»',
  },
});
