/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getMessage, getTransactions } from '../saga';
import {
  messageLoaded,
  messageLoadingError,
  transactionsLoaded,
  transactionsLoadingError,
} from '../actions';
import { LOAD_MESSAGE, LOAD_TRANSACTIONS } from '../constants';

describe('getMessage Saga', () => {
  let getMessageGenarator;

  beforeEach(() => {
    const action = {
      id: '0001:00000001',
    };

    getMessageGenarator = getMessage(action);

    const selectDescriptor = getMessageGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the messageLoaded action if it requests the data successfully', () => {
    const message = {
      id: '0001:00000001',
    };

    const putDescriptor = getMessageGenarator.next(message).value;
    expect(putDescriptor).toEqual(put(messageLoaded(message)));
  });

  it('should call the messageLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getMessageGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(messageLoadingError(response)));
  });
});

describe('getTransactions Saga', () => {
  let getTransactionsGenarator;

  beforeEach(() => {
    const action = {
      messageId: '0001-00000000-1234',
    };

    getTransactionsGenarator = getTransactions(action);

    const selectDescriptor = getTransactionsGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the transactionsLoaded action if it requests the data successfully', () => {
    const transactions = [
      {
        id: '0001:00000000:1234',
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

  it('should start task to watch for LOAD_MESSAGE action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_MESSAGE, getMessage));
  });

  it('second task should be LOAD_TRANSACTIONS action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_TRANSACTIONS, getTransactions),
    );
  });
});
