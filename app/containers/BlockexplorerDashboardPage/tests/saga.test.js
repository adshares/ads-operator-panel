/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, {
  getNodes,
  getAccounts,
  getBlocks,
  getMessages,
  getTransactions,
} from '../saga';
import {
  topNodesLoaded,
  topNodesLoadingError,
  topAccountsLoaded,
  topAccountsLoadingError,
  latestBlocksLoaded,
  latestBlocksLoadingError,
  latestMessagesLoaded,
  latestMessagesLoadingError,
  latestTransactionsLoaded,
  latestTransactionsLoadingError,
} from '../actions';
import {
  LOAD_TOP_NODES,
  LOAD_TOP_ACCOUNTS,
  LOAD_LATEST_BLOCKS,
  LOAD_LATEST_MESSAGES,
  LOAD_LATEST_TRANSACTIONS,
} from '../constants';

describe('getNodes Saga', () => {
  let getNodesGenarator;

  beforeEach(() => {
    getNodesGenarator = getNodes();

    const selectDescriptor = getNodesGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the topNodesLoaded action if it requests the data successfully', () => {
    const nodes = [
      {
        id: '0001',
      },
      {
        id: '0002',
      },
    ];
    const putDescriptor = getNodesGenarator.next(nodes).value;
    expect(putDescriptor).toEqual(put(topNodesLoaded(nodes)));
  });

  it('should call the topNodesLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getNodesGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(topNodesLoadingError(response)));
  });
});

describe('getAccounts Saga', () => {
  let getAccountsGenarator;

  beforeEach(() => {
    getAccountsGenarator = getAccounts();

    const selectDescriptor = getAccountsGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the topAccountsLoaded action if it requests the data successfully', () => {
    const accounts = [
      {
        id: '0001-00000000-9B6F',
      },
      {
        id: '0001-00000001-8B4E',
      },
    ];
    const putDescriptor = getAccountsGenarator.next(accounts).value;
    expect(putDescriptor).toEqual(put(topAccountsLoaded(accounts)));
  });

  it('should call the topAccountsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getAccountsGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(topAccountsLoadingError(response)));
  });
});

describe('getBlocks Saga', () => {
  let getBlocksGenerator;

  beforeEach(() => {
    getBlocksGenerator = getBlocks();

    const selectDescriptor = getBlocksGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the latestBlocksLoaded action if it requests the data successfully', () => {
    const blocks = [
      {
        id: '5B67E3A0',
      },
      {
        id: '5B67E3A1',
      },
    ];
    const putDescriptor = getBlocksGenerator.next(blocks).value;
    expect(putDescriptor).toEqual(put(latestBlocksLoaded(blocks)));
  });

  it('should call the latestBlocksLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getBlocksGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(latestBlocksLoadingError(response)));
  });
});

describe('getMessages Saga', () => {
  let getMessagesGenerator;

  beforeEach(() => {
    getMessagesGenerator = getMessages();

    const selectDescriptor = getMessagesGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the latestMessagesLoaded action if it requests the data successfully', () => {
    const messages = [
      {
        id: '0001:00000001',
      },
      {
        id: '0001:00000002',
      },
    ];
    const putDescriptor = getMessagesGenerator.next(messages).value;
    expect(putDescriptor).toEqual(put(latestMessagesLoaded(messages)));
  });

  it('should call the latestMessagesLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getMessagesGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(latestMessagesLoadingError(response)));
  });
});

describe('getTransactions Saga', () => {
  let getTransactionsGenerator;

  beforeEach(() => {
    getTransactionsGenerator = getTransactions();

    const selectDescriptor = getTransactionsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the latestTransactionsLoaded action if it requests the data successfully', () => {
    const transactions = [
      {
        id: '0001:00000001:0001',
      },
      {
        id: '0001:00000001:0002',
      },
    ];
    const putDescriptor = getTransactionsGenerator.next(transactions).value;
    expect(putDescriptor).toEqual(put(latestTransactionsLoaded(transactions)));
  });

  it('should call the latestTransactionsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getTransactionsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(
      put(latestTransactionsLoadingError(response)),
    );
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_TOP_NODES action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_TOP_NODES, getNodes));
  });

  it('second task should be LOAD_TOP_ACCOUNTS action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_TOP_ACCOUNTS, getAccounts),
    );
  });

  it('third task should be LOAD_LATEST_BLOCKS action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_LATEST_BLOCKS, getBlocks),
    );
  });

  it('fourth task should be LOAD_LATEST_MESSAGES action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_LATEST_MESSAGES, getMessages),
    );
  });

  it('fifth task should be LOAD_LATEST_TRANSACTIONS action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_LATEST_TRANSACTIONS, getTransactions),
    );
  });
});
