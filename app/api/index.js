function fetchNodes(limit = 5, offset = 0, sort = 'id', order = 'desc') {
  return send(
    `api/v1/blockexplorer/nodes?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchBlocks(limit = 5, offset = 0, sort = 'id', order = 'desc') {
  return send(
    `api/v1/blockexplorer/blocks?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchTransactions(
  limit = 10,
  offset = 0,
  sort = 'block_id',
  order = 'desc',
) {
  return send(
    `api/v1/blockexplorer/transactions?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchNode(id) {
  return send(`api/v1/blockexplorer/nodes/${id}`);
}

function fetchAccountsByNodeId(nodeId) {
  return send(`api/v1/blockexplorer/nodes/${nodeId}/accounts`);
}

function fetchAccountsById(id) {
  return send(`api/v1/blockexplorer/accounts/${id}`);
}

function fetchTransactionsByAccountId(accountId) {
  return send(
    `api/v1/blockexplorer/accounts/${accountId}/transactions?sort=block_id&order=desc`,
  );
}

function fetchTransaction(id) {
  return send(`api/v1/blockexplorer/transactions/${id}`);
}

function fetchBlock(id) {
  return send(`api/v1/blockexplorer/blocks/${id}`);
}

function fetchMessagesByBlockId(
  blockId,
  limit = 5,
  offset = 0,
  sort = 'id',
  order = 'desc',
) {
  return send(
    `api/v1/blockexplorer/blocks/${blockId}/messages?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchMessage(id) {
  return send(`api/v1/blockexplorer/messages/${id}`);
}

function fetchTransactionsByMessageId(messageId) {
  return send(`api/v1/blockexplorer/messages/${messageId}/transactions`);
}

function send(url, params) {
  const endpoint = process.env.API_URL + url;
  const credentials = {};
  const init = params ? { ...credentials, ...params } : { ...credentials };

  return fetch(endpoint, init).then(response => {
    if (response.status !== 200) {
      return response.json().then(errResp => {
        throw new Error(errResp.message);
      });
    }

    return response.json();
  });
}

export default {
  fetchNodes,
  fetchBlocks,
  fetchTransactions,
  fetchNode,
  fetchAccountsByNodeId,
  fetchAccountsById,
  fetchTransactionsByAccountId,
  fetchTransaction,
  fetchBlock,
  fetchMessagesByBlockId,
  fetchMessage,
  fetchTransactionsByMessageId,
};
