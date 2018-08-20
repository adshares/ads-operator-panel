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
  transactionTabTitle: {
    id: 'app.containers.MessagePage.transactionTabTitle',
    defaultMessage: 'Transactions',
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
  columnId: {
    id: 'app.containers.MessagePage.columnId',
    defaultMessage: 'Id',
  },
  columnType: {
    id: 'app.containers.MessagePage.columnType',
    defaultMessage: 'Type',
  },
  columnSenderAddress: {
    id: 'app.containers.MessagePage.columnSenderAddress',
    defaultMessage: 'From',
  },
  columnTargetAddress: {
    id: 'app.containers.MessagePage.columnTargetAddress',
    defaultMessage: 'To',
  },
  columnAmount: {
    id: 'app.containers.MessagePage.columnAmount',
    defaultMessage: 'Amount',
  },
  columnTime: {
    id: 'app.containers.MessagePage.columnTime',
    defaultMessage: 'Time',
  },
});
