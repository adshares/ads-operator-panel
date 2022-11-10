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
      const nodes = [
        {
          id: '0001',
        },
      ];
      const meta = { count: 1 };

      const expected = {
        type: LOAD_NODES_SUCCESS,
        data: nodes,
        meta,
      };
      expect(nodesLoaded({ data: nodes, meta })).toEqual(expected);
    });
  });
});
