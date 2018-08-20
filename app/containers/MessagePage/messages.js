/*
 * MessagePage Messages
 *
 * This contains all the text for the MessagePage component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.MessagePage.header',
    defaultMessage: 'Message',
  },
  metaTitle: {
    id: 'app.containers.MessagePage.metaTitle',
    defaultMessage: 'Message {id}',
  },
  metaDescription: {
    id: 'app.containers.MessagePage.metaDescription',
    defaultMessage: 'Message {id} page',
  },
  fieldId: {
    id: 'app.containers.MessagePage.fieldId',
    defaultMessage: 'Id',
  },
  fieldNodeId: {
    id: 'app.containers.MessagePage.fieldNodeId',
    defaultMessage: 'Node Id',
  },
  fieldBlockId: {
    id: 'app.containers.MessagePage.fieldBlockId',
    defaultMessage: 'Block Id',
  },
  fieldTransactionCount: {
    id: 'app.containers.MessagePage.fieldTransactionCount',
    defaultMessage: 'Transactions',
  },
  fieldLength: {
    id: 'app.containers.MessagePage.fieldLength',
    defaultMessage: 'Length',
  },
});
