function onGetUserSuccess(state, action) {
  let fetchedUser = (action && action.payload) ? action.payload : {};
  fetchedUser = fetchedUser.detail;

  return Object.assign({}, state, {
    user: { fetchedUser },
    error: {}
  });
}

function onCreateUserSuccess(state, action) {
  return Object.assign({}, state, {
    user: (action && action.payload)? action.payload:{},
    error: {}
  });
}

function onLoginSuccess(state, action) {
  let user = (action && action.payload) ? action.payload : {};
  user = user.detail;

  return Object.assign({}, state, {
    user: {
      currentUser: user
    },
    error: {}
  });
}

function onLogoutSuccess(state, action) {
  return Object.assign({}, state, {
    user: {},
    error: {}
  });
}

function onChangeUserInfoSuccess(state, action) {
  return Object.assign({}, state, {
    error: {}
  });
}

function onChangeUserPasswordSuccess(state, action) {
  return Object.assign({}, state, {
    error: {}
  });
}

function onFieldValidationSuccess(state, action) {
  return Object.assign({}, state, {
    error: {}
  });
}

export const userReducerRoot = {
  GET_USER_SUCCESS: onGetUserSuccess,
  CREATE_USER_SUCCESS: onCreateUserSuccess,
  USER_LOGIN_SUCCESS: onLoginSuccess,
  USER_LOGOUT_SUCCESS: onLogoutSuccess,
  CHANGE_USER_INFO_SUCCESS: onChangeUserInfoSuccess,
  CHANGE_USER_PASSWORD_SUCCESS: onChangeUserPasswordSuccess,
  FIELD_VALIDATATION_SUCCESS: onFieldValidationSuccess
}