const routes = {
  '/': 'Home',
  '/blockexplorer': 'Blockexplorer',
  '/blockexplorer/nodes': 'Nodes',
  '/blockexplorer/nodes/:page/:sort/:order': null,
  '/blockexplorer/nodes/:page/:sort': null,
  '/blockexplorer/nodes/:id': (url, match) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      return null;
    }

    return `Node ${match.id}`;
  },
  '/blockexplorer/blocks': 'Blocks',
  '/blockexplorer/blocks/:page/:sort/:order': null,
  '/blockexplorer/blocks/:page/:sort': null,
  '/blockexplorer/blocks/:id': (url, match) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      return null;
    }

    return `Block ${match.id}`;
  },
  '/blockexplorer/transactions': 'Transactions',
  '/blockexplorer/transactions/:page/:sort/:order': null,
  '/blockexplorer/transactions/:page/:sort': null,
  '/blockexplorer/transactions/:id': 'Transaction :id',
  '/blockexplorer/accounts': null,
  '/blockexplorer/accounts/:id': 'Account :id',
  '/blockexplorer/messages': null,
  '/blockexplorer/messages/:id': 'Message :id',
};

export default {
  limit: process.env.LIMIT,
  routes,
};
