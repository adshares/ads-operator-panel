/*
 * TransactionPage Messages
 *
 * This contains all the text for the TransactionPage component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.TransactionPage.header',
    defaultMessage: 'Translation',
  },
  metaTitle: {
    id: 'app.containers.TransactionPage.metaTitle',
    defaultMessage: 'Transaction {id}',
  },
  metaDescription: {
    id: 'app.containers.TransactionPage.metaDescription',
    defaultMessage: 'Transaction {id} page',
  },
  fieldId: {
    id: 'app.containers.TransactionPage.fieldId',
    defaultMessage: 'Id',
  },
  fieldBlockId: {
    id: 'app.containers.TransactionPage.fieldBlockId',
    defaultMessage: 'Block Id',
  },
  fieldMessageId: {
    id: 'app.containers.TransactionPage.fieldMessageId',
    defaultMessage: 'Message Id',
  },
  fieldSenderAddress: {
    id: 'app.containers.TransactionPage.fieldSenderAddress',
    defaultMessage: 'Sender Address',
  },
  fieldTargetAddress: {
    id: 'app.containers.TransactionPage.fieldTargetAddress',
    defaultMessage: 'Target Address',
  },
  fieldSenderFee: {
    id: 'app.containers.TransactionPage.fieldSenderFee',
    defaultMessage: 'Sender Fee',
  },
  fieldSize: {
    id: 'app.containers.TransactionPage.fieldSize',
    defaultMessage: 'Size',
  },
  fieldType: {
    id: 'app.containers.TransactionPage.fieldType',
    defaultMessage: 'Type',
  },
  fieldTime: {
    id: 'app.containers.TransactionPage.fieldTime',
    defaultMessage: 'Time',
  },
});
