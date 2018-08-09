/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getNodes } from '../saga';
import { nodesLoaded, nodesLoadingError } from '../actions';

import { LOAD_NODES } from '../constants';

describe('getNodes Saga', () => {
  let getNodesGenarator;

  beforeEach(() => {
    const action = {
      sort: 'id',
      order: 'desc',
      limit: 10,
      offset: 0,
    };

    getNodesGenarator = getNodes(action);
    const selectDescriptor = getNodesGenarator.next().value; // eslint-disable-line no-unused-vars
  });

  it('should dispatch the nodesLoaded action if it requests the data successfully', () => {
    const nodes = [
      {
        id: '0001',
      },
      {
        id: '0002',
      },
    ];

    const putDescriptor = getNodesGenarator.next(nodes).value;
    expect(putDescriptor).toEqual(put(nodesLoaded(nodes)));
  });

  it('should call the nodesLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getNodesGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(nodesLoadingError(response)));
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_NODES action', () => {
    const takeNodes = saga.next().value;
    expect(takeNodes).toEqual(takeLatest(LOAD_NODES, getNodes));
  });
});
