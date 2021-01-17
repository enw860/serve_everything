import {
  GET_CUR_USER_SUCCESS,
  CREATE_USER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  CHANGE_USER_INFO_SUCCESS,
  CHANGE_USER_PASSWORD_SUCCESS
} from "../const/user";

function onGetCurrentUserSuccess(state, action) {
  return Object.assign({}, state, {
    user: (action && action.payload)? action.payload:{},
    lastCall:{
      state: true,
      reason: {}
    }
  });
}

function onCreateUserSuccess(state, action) {
  return Object.assign({}, state, {
    user: (action && action.payload)? action.payload:{},
    lastCall:{
      state: true,
      reason: {}
    }
  });
}

function onLoginSuccess(state, action) {
  return Object.assign({}, state, {
    user: (action && action.payload)? action.payload:{},
    lastCall:{
      state: true,
      reason: {}
    }
  });
}

function onLogoutSuccess(state, action) {
  return Object.assign({}, state, {
    lastCall:{
      state: true,
      reason: {}
    }
  });
}

function onChangeUserInfoSuccess(state, action) {
  return Object.assign({}, state, {
    lastCall:{
      state: true,
      reason: {}
    }
  });
}

function onChangeUserPasswordSuccess(state, action) {
  return Object.assign({}, state, {
    lastCall:{
      state: true,
      reason: {}
    }
  });
}

export const userReducerRoot = {
  GET_CUR_USER_SUCCESS: onGetCurrentUserSuccess,
  CREATE_USER_SUCCESS: onCreateUserSuccess,
  USER_LOGIN_SUCCESS: onLoginSuccess,
  USER_LOGOUT_SUCCESS: onLogoutSuccess,
  CHANGE_USER_INFO_SUCCESS: onChangeUserInfoSuccess,
  CHANGE_USER_PASSWORD_SUCCESS: onChangeUserPasswordSuccess
}