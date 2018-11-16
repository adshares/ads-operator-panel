/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getAccounts } from '../saga';
import { accountsLoaded, accountsLoadingError } from '../actions';
import { LOAD_ACCOUNTS } from '../constants';

describe('getAccounts Saga', () => {
  let getNodesGenarator;

  beforeEach(() => {
    const action = {
      sort: 'id',
      order: 'desc',
      limit: 10,
      offset: 0,
    };

    getNodesGenarator = getAccounts(action);

    const selectDescriptor = getNodesGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the accountsLoaded action if it requests the data successfully', () => {
    const accounts = [
      {
        id: '00000001',
      },
      {
        id: '00000002',
      },
    ];

    const putDescriptor = getNodesGenarator.next(accounts).value;
    expect(putDescriptor).toEqual(put(accountsLoaded(accounts)));
  });

  it('should call the accountsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getNodesGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(accountsLoadingError(response)));
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_ACCOUNTS action', () => {
    const takeNodes = saga.next().value;
    expect(takeNodes).toEqual(takeLatest(LOAD_ACCOUNTS, getAccounts));
  });
});
