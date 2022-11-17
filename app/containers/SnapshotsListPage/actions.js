/*
 *
 * SnapshotsListPage actions
 *
 */

import {
  LOAD_SNAPSHOTS,
  LOAD_SNAPSHOTS_SUCCESS,
  LOAD_SNAPSHOTS_ERROR,
} from './constants';

export function loadSnapshots(limit, offset, sort, order) {
  return {
    type: LOAD_SNAPSHOTS,
    limit,
    offset,
    sort,
    order,
  };
}

export function snapshotsLoaded(data) {
  return {
    type: LOAD_SNAPSHOTS_SUCCESS,
    ...data,
  };
}

export function snapshotsLoadingError(error) {
  return {
    type: LOAD_SNAPSHOTS_ERROR,
    error,
  };
}
