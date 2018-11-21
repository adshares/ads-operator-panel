/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, {
  getNode,
  getAccounts,
  getMessages,
  getTransactions,
} from '../saga';
import {
  nodeLoaded,
  nodeLoadingError,
  accountsLoaded,
  accountsLoadingError,
  messagesLoaded,
  messagesLoadingError,
  transactionsLoaded,
  transactionsLoadingError,
} from '../actions';
import {
  LOAD_NODE,
  LOAD_ACCOUNTS,
  LOAD_MESSAGES,
  LOAD_TRANSACTIONS,
} from '../constants';

describe('getNode Saga', () => {
  let getNodeGenarator;

  beforeEach(() => {
    const action = {
      id: '0001',
    };

    getNodeGenarator = getNode(action);

    const selectDescriptor = getNodeGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the nodeLoaded action if it requests the data successfully', () => {
    const node = {
      id: '0001',
    };

    const putDescriptor = getNodeGenarator.next(node).value;
    expect(putDescriptor).toEqual(put(nodeLoaded(node)));
  });

  it('should call the nodeLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getNodeGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(nodeLoadingError(response)));
  });
});

describe('getAccounts Saga', () => {
  let getAccountsGenarator;

  beforeEach(() => {
    const action = {
      nodeId: '0001',
    };

    getAccountsGenarator = getAccounts(action);

    const selectDescriptor = getAccountsGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the accountsLoaded action if it requests the data successfully', () => {
    const accounts = [
      {
        id: '0002-00000001-659C',
      },
    ];

    const putDescriptor = getAccountsGenarator.next(accounts).value;
    expect(putDescriptor).toEqual(put(accountsLoaded(accounts)));
  });

  it('should call the accountsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getAccountsGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(accountsLoadingError(response)));
  });
});

describe('getMessages Saga', () => {
  let getMessagesGenarator;

  beforeEach(() => {
    const action = {
      nodeId: '0001',
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
      nodeId: '0001',
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

  it('should start task to watch for LOAD_NODE action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_NODE, getNode));
  });

  it('second task should be LOAD_ACCOUNTS action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_ACCOUNTS, getAccounts),
    );
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
