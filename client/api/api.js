const BASE_URL = ""

// helper functions
function* yieldRequest(method, endpoint, sendData, queryData) {
  const { url, paramObj } = prepareRequest(method, endpoint, sendData, queryData);

  return yield fetch(url, paramObj)
    .then(handleFetchResponse)
    .catch(error => console.log('An error occured with fetch:', error));
}

function sendRequest(method, endpoint, sendData, queryData) {
  const { url, paramObj } = prepareRequest(method, endpoint, sendData, queryData);

  return fetch(url, paramObj)
    .then(handleFetchResponse)
    .catch(error => console.log('An error occured with fetch:', error));
}

function prepareRequest(method, endpoint, sendData, queryData) {
  let url = BASE_URL + endpoint;
  let paramObj = {
    method: method,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  }

  paramObj.body = JSON.stringify(sendData);

  if (Object.keys(queryData).length > 0) {
    url += '?' + setupQueryParams(queryData);
  }

  return {
    url,
    paramObj
  };
}

function setupQueryParams(params = {}) {
  var esc = encodeURIComponent;
  return Object.keys(params)
    .map(key => esc(key) + '=' + esc(params[key]))
    .join('&');
}

function handleFetchResponse(resp) {
  if (resp.ok || resp.status === 200 || resp.status === 401) {
    return resp.json()
  }

  throw Error(resp.statusText);
}

module.exports = {
  yieldRequest,
  sendRequest
}