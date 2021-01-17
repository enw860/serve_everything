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

// admin endpoints
export const getAllUsers = data => sendRequest("GET", "/admin/user/all", data);
export const getAllWorkspaces = data => sendRequest("GET", "/admin/workspace/all", data);
export const getAllOwnerships = data => sendRequest("GET", "/admin/ownership/all", data);

// user endpoints
export const getCurUserInfo = data => sendRequest("GET", "/user/cur", data);
export const postLogin = data => sendRequest("POST", "/user/login", data);
export const getLogout = data => sendRequest("GET", "/user/logout", data);
export const postCreateUser = data => sendRequest("POST", "/user/create", data);
export const updatePassword = data => sendRequest("PUT", "/user/changePassword", data);
export const updateInfo = data => sendRequest("PUT", "/user/changeInfo", data);

// workspace endpoints
export const getUserWorkspace = data => sendRequest("GET", "/workspace/", data);
export const postCreateWorkspace = data => sendRequest("POST", "/workspace/create", data);
export const putUpdateFilename = data => sendRequest("PUT", "/workspace/updetaFilename", data);
export const deleteWorkspace = data => sendRequest("DELETE", "/workspace/delete", data);
export const getOwnershipsOfWorkspace = data => sendRequest("GET", "/workspace/ownership", data);
export const postCreateOwnership = data => sendRequest("POST", "/workspace/ownership/create", data);
export const putShiftOwnership = data => sendRequest("PUT", "/workspace/ownership/shift", data);
export const deleteWorkspaceOwnership = data => sendRequest("DELETE", "/workspace/ownership/delete", data);
