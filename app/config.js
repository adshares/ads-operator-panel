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

const accounts = {
  technical: {
    '0001-00000024-FF89': 'Black hole',
  },
  exchanges: {
    '0001-00000002-BB2D': 'Ethereum Gateway',
    '0001-00000003-AB0C': 'Binance Smart Chain Gateway',
    '0001-0000002C-7E81': 'Graviex Exchange',
  },
};

export default {
  limit: process.env.LIMIT,
  date_format: 'YYYY-MM-DD HH:mm:ss',
  routes,
  tablesMinWidth,
  accounts,
};
