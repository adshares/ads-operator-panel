const routes = {
  '/': 'Home',
  '/blockexplorer': 'Blockexplorer',
  '/blockexplorer/nodes': 'Nodes',
  '/blockexplorer/nodes/:page/:sort/:order': null,
  '/blockexplorer/nodes/:page/:sort': null,
  '/blockexplorer/nodes/:id/accounts/:page/:sort': null,
  '/blockexplorer/nodes/:id/accounts/:page': null,
  '/blockexplorer/blocks': 'Blocks',
  '/blockexplorer/blocks/:page/:sort/:order': null,
  '/blockexplorer/blocks/:page/:sort': null,
  '/blockexplorer/blocks/:id/messages/:page/:sort': null,
  '/blockexplorer/blocks/:id/messages/:page': null,
  '/blockexplorer/blocks/:blockId/messages/:id/transactions/:page/:sort': null,
  '/blockexplorer/blocks/:blockId/messages/:id/transactions/:page': null,
  '/blockexplorer/nodes/:nodeId/accounts/:id/transactions/:page/:sort': null,
  '/blockexplorer/nodes/:nodeId/accounts/:id/transactions/:page': null,
  '/blockexplorer/transactions': 'Transactions',
  '/blockexplorer/transactions/:page/:sort/:order': null,
  '/blockexplorer/transactions/:page/:sort': null,
  '/blockexplorer/accounts': null,
  '/blockexplorer/accounts/:id': 'Account :id',
  '/blockexplorer/messages': null,
  '/blockexplorer/messages/:id': 'Message :id',
  '/blockexplorer/nodes/:id': (url, match) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      if (!href.includes('/transactions')) {
        return null;
      }
    }

    return `Node ${match.id}`;
  },
  '/blockexplorer/nodes/:id/accounts/:accountId': (url, match) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      return null;
    }
    return `Account ${match.accountId}`;
  },
  '/blockexplorer/nodes/:nodeId/accounts/:page/:sort/:order': (url, match) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      return `Node ${match.nodeId}`;
    }

    return null;
  },
  '/blockexplorer/blocks/:id': (url, match) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      if (!href.includes('/transactions')) {
        return null;
      }

      return `Block ${match.id}`;
    }

    return `Block ${match.id}`;
  },
  '/blockexplorer/blocks/:id/messages/:messageId': (url, match) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      return null;
    }
    return `Message ${match.messageId}`;
  },
  '/blockexplorer/blocks/:id/messages/:page/:sort/:order': (url, match) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      return `Block ${match.id}`;
    }

    return null;
  },
  '/blockexplorer/transactions/:id': (url, match) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      return null;
    }

    return `Transaction ${match.id}`;
  },
  '/blockexplorer/blocks/:blockId/messages/:messageId': (url, match) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      return null;
    }
    return `Message ${match.messageId}`;
  },
  '/blockexplorer/blocks/:blockId/messages/:id/transactions/:page/:sort/:order': (
    url,
    match,
  ) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      return `Message ${match.id}`;
    }

    return null;
  },

  '/blockexplorer/nodes/:nodeId/accounts/:Id': (url, match) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      return null;
    }
    return `Account ${match.id}`;
  },
  '/blockexplorer/nodes/:nodeId/accounts/:id/transactions/:page/:sort/:order': (
    url,
    match,
  ) => {
    const { href } = window.location;
    if (href.includes('/asc') || href.includes('/desc')) {
      return `Account ${match.id}`;
    }

    return null;
  },
};

export default {
  limit: process.env.LIMIT,
  routes,
};
