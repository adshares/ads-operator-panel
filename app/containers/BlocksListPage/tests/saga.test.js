/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import defaultSaga, { getBlocks } from '../saga';
import { blocksLoaded, blocksLoadingError } from '../actions';
import { LOAD_BLOCKS } from '../constants';

describe('getBlocks Saga', () => {
  let getNodesGenarator;

  beforeEach(() => {
    const action = {
      sort: 'id',
      order: 'desc',
      limit: 10,
      offset: 0,
    };

    getNodesGenarator = getBlocks(action);

    const selectDescriptor = getNodesGenarator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the blocksLoaded action if it requests the data successfully', () => {
    const blocks = [
      {
        id: '00000001',
      },
      {
        id: '00000002',
      },
    ];

    const putDescriptor = getNodesGenarator.next(blocks).value;
    expect(putDescriptor).toEqual(put(blocksLoaded(blocks)));
  });

  it('should call the blocksLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getNodesGenarator.throw(response).value;
    expect(putDescriptor).toEqual(put(blocksLoadingError(response)));
  });
});

describe('defaultSaga Saga', () => {
  const saga = defaultSaga();

  it('should start task to watch for LOAD_BLOCKS action', () => {
    const takeNodes = saga.next().value;
    expect(takeNodes).toEqual(takeLatest(LOAD_BLOCKS, getBlocks));
  });
});
