import { REQUEST_ONGOING, COUGHT_FAILURE } from "../const/general";
import { fetchUser, login, logout, createUser, resetPassword, updateInfo, validate } from "../../../api/api";
import {
  GET_USER_SUCCESS,
  CREATE_USER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  CHANGE_USER_INFO_SUCCESS,
  CHANGE_USER_PASSWORD_SUCCESS,
  FIELD_VALIDATATION_SUCCESS
} from "../const/user";

// get current user
export function fetch_user(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: GET_USER_SUCCESS,
    onError: COUGHT_FAILURE,
    action: fetchUser,
    payload
  }
}

// create user
export function create_User(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: CREATE_USER_SUCCESS,
    onError: COUGHT_FAILURE,
    action: createUser,
    payload
  }
}

// login
export function user_login(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: USER_LOGIN_SUCCESS,
    onError: COUGHT_FAILURE,
    action: login,
    payload
  }
}

// logout
export function user_logout() {
  return {
    type: REQUEST_ONGOING,
    onSuccess: USER_LOGOUT_SUCCESS,
    onError: COUGHT_FAILURE,
    action: logout
  }
}

// change general information states
export function update_info(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: CHANGE_USER_INFO_SUCCESS,
    onError: COUGHT_FAILURE,
    action: updateInfo,
    payload
  }
}

// change password states
export function reset_password(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: CHANGE_USER_PASSWORD_SUCCESS,
    onError: COUGHT_FAILURE,
    action: resetPassword,
    payload
  }
}

// validate field
export function validate_field(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: FIELD_VALIDATATION_SUCCESS,
    onError: COUGHT_FAILURE,
    action: validate,
    payload
  }
}