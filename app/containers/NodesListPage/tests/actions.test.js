import { LOAD_NODES, LOAD_NODES_SUCCESS } from '../constants';
import { loadNodes, nodesLoaded } from '../actions';

describe('NodesListPage actions', () => {
  describe('Load nodes Action', () => {
    it('has a type of LOAD_NODES', () => {
      const expected = {
        type: LOAD_NODES,
      };
      expect(loadNodes()).toEqual(expected);
    });
  });
  describe('Latest nodes loaded Action', () => {
    it('has a type of LOAD_NODES_SUCCESS', () => {
      const nodes = [];

      const expected = {
        type: LOAD_NODES_SUCCESS,
        data: nodes,
      };
      expect(nodesLoaded(nodes)).toEqual(expected);
    });
  });
});
