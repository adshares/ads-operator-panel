function fetchNodes() {
  return send('http://ads-operator.ads/api/v1/blockexplorer/nodes');
}

function fetchBlocks() {
  return send('http://ads-operator.ads/api/v1/blockexplorer/blocks');
}

function send(url, params) {
  const credentials = {};
  const init = params ? { ...credentials, ...params } : { ...credentials };

  return fetch(url, init).then((response) => {
    if (response.status !== 200) {
      return response.json().then((errResp) => {
        throw new Error(errResp.message);
      });
    }

    return response.json();
  });
}

export default {
  fetchNodes,
  fetchBlocks,
};
