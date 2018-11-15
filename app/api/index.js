const defaults = {
  apiUrl: 'api/v1/blockexplorer/',
  limit: 10,
  offset: 0,
  sort: 'id',
  order: 'desc',
};

function fetchNodes(
  limit = defaults.limit,
  offset = defaults.offset,
  sort = defaults.sort,
  order = defaults.order,
) {
  return send(
    `nodes?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchNode(id) {
  return send(`nodes/${id}`);
}

function fetchAccounts(
  limit = defaults.limit,
  offset = defaults.offset,
  sort = defaults.sort,
  order = defaults.order,
) {
  return send(
    `accounts?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchAccountsByNodeId(
  nodeId,
  limit = defaults.limit,
  offset = defaults.offset,
  sort = defaults.sort,
  order = defaults.order,
) {
  return send(
    `nodes/${nodeId}/accounts?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchAccount(id) {
  return send(`accounts/${id}`);
}

function fetchBlocks(
  limit = defaults.limit,
  offset = defaults.offset,
  sort = defaults.sort,
  order = defaults.order,
) {
  return send(
    `blocks?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchBlock(id) {
  return send(`blocks/${id}`);
}

function fetchMessages(
  limit = defaults.limit,
  offset = defaults.offset,
  sort = defaults.sort,
  order = defaults.order,
) {
  return send(
    `messages?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchMessagesByBlockId(
  blockId,
  limit = defaults.limit,
  offset = defaults.offset,
  sort = defaults.sort,
  order = defaults.order,
) {
  return send(
    `blocks/${blockId}/messages?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchMessage(id) {
  return send(`messages/${id}`);
}

function fetchTransactions(
  limit = defaults.limit,
  offset = defaults.offset,
  sort = defaults.sort,
  order = defaults.order,
) {
  return send(
    `transactions?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchTransactionsByAccountId(
  accountId,
  limit = defaults.limit,
  offset = defaults.offset,
  sort = defaults.sort,
  order = defaults.order,
) {
  return send(
    `accounts/${accountId}/transactions?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchTransactionsByMessageId(
  messageId,
  limit = defaults.limit,
  offset = defaults.offset,
  sort = defaults.sort,
  order = defaults.order,
) {
  return send(
    `messages/${messageId}/transactions?limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`,
  );
}

function fetchTransaction(id) {
  return send(`transactions/${id}`);
}

function send(url, params) {
  const endpoint = process.env.API_URL + defaults.apiUrl + url;
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
  fetchNode,
  fetchAccounts,
  fetchAccountsByNodeId,
  fetchAccount,
  fetchBlocks,
  fetchBlock,
  fetchMessages,
  fetchMessagesByBlockId,
  fetchMessage,
  fetchTransactions,
  fetchTransactionsByAccountId,
  fetchTransactionsByMessageId,
  fetchTransaction,
};
