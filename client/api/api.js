const BASE_URL = ""

// helper functions
function* sendRequest(method, endpoint, sendData, queryData) {
  let url = BASE_URL + endpoint;
  let paramObj = {
    method: method,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  }

  paramObj.body = JSON.stringify(sendData);
  url += '?' + setupQueryParams(queryData);

  return yield fetch(url, paramObj)
    .then(handleFetchResponse)
    .catch(error => console.log('An error occured with fetch:', error));
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
