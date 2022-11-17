const routes = {
  '/': 'Home',
  '/blockexplorer': 'Blockexplorer',

  '/blockexplorer/nodes': 'Nodes',
  '/blockexplorer/nodes/:id/accounts': null,
  '/blockexplorer/nodes/:id/messages': null,
  '/blockexplorer/nodes/:id/transactions': null,
  '/blockexplorer/nodes/:nodeId/accounts/:accountId/transactions': null,
  '/blockexplorer/nodes/:id': 'Node :id',
  '/blockexplorer/nodes/:nodeId/accounts/:id': 'Account :id',
  '/blockexplorer/nodes/:nodeId/accounts/:accountId/transactions/:id':
    'Transaction :id',

  '/blockexplorer/blocks': 'Blocks',
  '/blockexplorer/blocks/:blockId/messages': null,
  '/blockexplorer/blocks/:blockId/transactions': null,
  '/blockexplorer/blocks/:blockId/messages/:id/transactions': null,
  '/blockexplorer/blocks/:id': 'Block id',
  '/blockexplorer/blocks/:blockId/messages/:id': 'Message id',
  '/blockexplorer/blocks/:blockId/messages/:id/transactions/:id':
    'Transaction :id',
  '/blockexplorer/messages': 'Messages',
  '/blockexplorer/messages/:id': 'Message :id',
  '/blockexplorer/accounts': 'Accounts',
  '/blockexplorer/accounts/:id': 'Account :id',
  '/blockexplorer/transactions': 'Transactions',
  '/blockexplorer/snapshots': 'Snapshots',
  '/blockexplorer/snapshots/:id': 'Snapshot :id',
};

const tablesMinWidth = {
  tableXs: '375px',
  tableSm: '500px',
  tableMd: '600px',
  tableLg: '1024px',
};
export default {
  limit: process.env.LIMIT || 50,
  date_format: 'YYYY-MM-DD HH:mm:ss',
  routes,
  tablesMinWidth,
};
