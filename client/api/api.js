const BASE_URL = ""

// helper functions
function* sendRequest(method, endpoint, sendData) {
  let url = BASE_URL + endpoint;
  let paramObj = {
    method: method,
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
  }

  if (["PUT", "POST", "DELETE"].indexOf(method) > -1) {
    paramObj.body = JSON.stringify(sendData);
  } else if (sendData){
    url += '?' + setupQueryParams(sendData);
  }

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

// user endpoints
export const fetchUser = data => sendRequest("POST", "/api/users/info", data);
export const login = data => sendRequest("POST", "/api/users/login", data);
export const logout = data => sendRequest("POST", "/api/users/logout", data);
export const createUser = data => sendRequest("POST", "/api/users/create", data);
export const resetPassword = data => sendRequest("POST", "/api/user/resetPassword", data);
export const updateInfo = data => sendRequest("PUT", "/api/user/update", data);
export const validate = data => sendRequest("POST", "/api/user/validate", data);
