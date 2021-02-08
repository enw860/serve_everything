import { REQUEST_ONGOING, COUGHT_FAILURE } from "../const/general";
import { fetchUserInfo, login, logout, createAccount, sendEmailForResetPassword, resetPasswordWithSecrete, updateUserProfile, validUsername, validPassword } from "../../../api/auth";
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
    action: data => fetchUserInfo(data, true),
    payload
  }
}

// create user
export function create_User(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: CREATE_USER_SUCCESS,
    onError: COUGHT_FAILURE,
    action: data => createAccount(data, true),
    payload
  }
}

// login
export function user_login(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: USER_LOGIN_SUCCESS,
    onError: COUGHT_FAILURE,
    action: data => login(data, true),
    payload
  }
}

// logout
export function user_logout() {
  return {
    type: REQUEST_ONGOING,
    onSuccess: USER_LOGOUT_SUCCESS,
    onError: COUGHT_FAILURE,
    action: data => logout(data, true),
  }
}

// change general information states
export function update_info(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: CHANGE_USER_INFO_SUCCESS,
    onError: COUGHT_FAILURE,
    action: data => updateUserProfile(data, true),
    payload
  }
}

// send reset password email
export function send_reset_password_email(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: CHANGE_USER_PASSWORD_SUCCESS,
    onError: COUGHT_FAILURE,
    action: data => sendEmailForResetPassword(data, true),
    payload
  }
}

// change password
export function reset_password_with_secrete(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: CHANGE_USER_PASSWORD_SUCCESS,
    onError: COUGHT_FAILURE,
    action: data => resetPasswordWithSecrete(data, true),
    payload
  }
}

// validate username
export function validate_username(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: FIELD_VALIDATATION_SUCCESS,
    onError: COUGHT_FAILURE,
    action: data => validUsername(data, true),
    payload
  }
}

// validate password
export function validate_password(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: FIELD_VALIDATATION_SUCCESS,
    onError: COUGHT_FAILURE,
    action: data => validPassword(data, true),
    payload
  }
}