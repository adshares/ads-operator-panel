const routes = {
  '/': 'Home',
  '/blockexplorer': 'Blockexplorer',

  '/blockexplorer/nodes': 'Nodes',
  '/blockexplorer/nodes/:id/accounts': null,
  '/blockexplorer/nodes/:nodeId/accounts/:accountId/transactions': null,
  '/blockexplorer/nodes/:id': 'Node :id',
  '/blockexplorer/nodes/:nodeId/accounts/:id': 'Account :id',
  '/blockexplorer/nodes/:nodeId/accounts/:accountId/transactions/:id':
    'Transaction :id',

  '/blockexplorer/blocks': 'Blocks',
  '/blockexplorer/blocks/:blockId/messages': null,
  '/blockexplorer/blocks/:blockId/messages/:id/transactions': null,
  '/blockexplorer/blocks/:id': 'Block id',
  '/blockexplorer/blocks/:blockId/messages/:id': 'Message id',
  '/blockexplorer/blocks/:blockId/messages/:id/transactions/:id':
    'Transaction :id',
  '/blockexplorer/messages/:id': 'Message :id',
  '/blockexplorer/accounts/:id': 'Account :id',
  '/blockexplorer/transactions': 'Transactions',
  '/blockexplorer/accounts': null,
  '/blockexplorer/messages': null,
};

export default {
  limit: process.env.LIMIT,
  date_format: 'YYYY-MM-DD HH:mm:ss',
  routes,
};
