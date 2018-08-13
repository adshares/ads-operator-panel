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

function fetchTransactions(limit = 5, offset = 0, sort = 'id', order = 'desc') {
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
};
