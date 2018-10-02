/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getAccount, getTransactions } from '../saga';
import {
  accountLoaded,
  accountLoadingError,
  transactionsLoaded,
  transactionsLoadingError,
} from '../actions';
import { LOAD_ACCOUNT, LOAD_TRANSACTIONS } from '../constants';

describe('getAccount Saga', () => {
  let getAccountGenarator;

  beforeEach(() => {
    const action = {
      id: '0001-00000000-1234',
    };

    getAccountGenarator = getAccount(action);

    const selectDescriptor = getAccountGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the accountLoaded action if it requests the data successfully', () => {
    const account = {
      id: '0001-00000000-1234',
    };

    const putDescriptor = getAccountGenarator.next(account).value;
    expect(putDescriptor).toEqual(put(accountLoaded(account)));
  });

  it('should call the accountLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getAccountGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(accountLoadingError(response)));
  });
});

describe('getTransactions Saga', () => {
  let getTransactionsGenarator;

  beforeEach(() => {
    const action = {
      accountId: '0001-00000000-1234',
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

  it('should start task to watch for LOAD_ACCOUNT action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_ACCOUNT, getAccount));
  });

  it('second task should be LOAD_TRANSACTIONS action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_TRANSACTIONS, getTransactions),
    );
  });
});
