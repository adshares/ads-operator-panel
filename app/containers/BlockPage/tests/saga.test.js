/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getBlock, getMessages, getTransactions } from '../saga';
import {
  blockLoaded,
  blockLoadingError,
  messagesLoaded,
  messagesLoadingError,
  transactionsLoaded,
  transactionsLoadingError,
} from '../actions';
import { LOAD_BLOCK, LOAD_MESSAGES, LOAD_TRANSACTIONS } from '../constants';

describe('getBlock Saga', () => {
  let getBlockGenarator;

  beforeEach(() => {
    const action = {
      id: 'ABC11234',
    };

    getBlockGenarator = getBlock(action);

    const selectDescriptor = getBlockGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the blockLoaded action if it requests the data successfully', () => {
    const block = {
      id: 'ABC11234',
    };

    const putDescriptor = getBlockGenarator.next(block).value;
    expect(putDescriptor).toEqual(put(blockLoaded(block)));
  });

  it('should call the blockLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getBlockGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(blockLoadingError(response)));
  });
});

describe('getMessages Saga', () => {
  let getMessagesGenarator;

  beforeEach(() => {
    const action = {
      blockId: 'ABC11234',
    };

    getMessagesGenarator = getMessages(action);

    const selectDescriptor = getMessagesGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the messagesLoaded action if it requests the data successfully', () => {
    const messages = [
      {
        id: '000F:00003823',
      },
    ];

    const putDescriptor = getMessagesGenarator.next(messages).value;
    expect(putDescriptor).toEqual(put(messagesLoaded(messages)));
  });

  it('should call the messagesLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getMessagesGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(messagesLoadingError(response)));
  });
});

describe('getTransactions Saga', () => {
  let getTransactionsGenarator;

  beforeEach(() => {
    const action = {
      blockId: 'ABC11234',
    };

    getTransactionsGenarator = getTransactions(action);

    const selectDescriptor = getTransactionsGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the transactionsLoaded action if it requests the data successfully', () => {
    const transactions = [
      {
        id: '000F:00003823:0001',
      },
    ];

    const putDescriptor = getTransactionsGenarator.next(transactions).value;
    expect(putDescriptor).toEqual(put(transactionsLoaded(transactions)));
  });

  it('should call the transactionsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getTransactionsGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(transactionsLoadingError(response)));
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_BLOCK action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_BLOCK, getBlock));
  });

  it('second task should be LOAD_MESSAGES action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_MESSAGES, getMessages),
    );
  });

  it('second task should be LOAD_TRANSACTIONS action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_TRANSACTIONS, getTransactions),
    );
  });
});
