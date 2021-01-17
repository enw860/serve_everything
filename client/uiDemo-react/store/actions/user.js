import { REQUEST_ONGOING, COUGHT_FAILURE } from "../const/general";
import { getCurUserInfo, postCreateUser, postLogin, getLogout, updatePassword, updateInfo } from "../../api/api";
import {
  GET_CUR_USER_SUCCESS,
  CREATE_USER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  CHANGE_USER_INFO_SUCCESS,
  CHANGE_USER_PASSWORD_SUCCESS
} from "../const/user";

// get current user
export function getCurrentUser() {
  return {
    type: REQUEST_ONGOING,
    onSuccess: GET_CUR_USER_SUCCESS,
    onError: COUGHT_FAILURE,
    action: getCurUserInfo
  }
}

// create user
export function createNewUser(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: CREATE_USER_SUCCESS,
    onError: COUGHT_FAILURE,
    action: postCreateUser,
    payload
  }
}

// login
export function userLogin(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: USER_LOGIN_SUCCESS,
    onError: COUGHT_FAILURE,
    action: postLogin,
    payload
  }
}

// logout
export function userLogout() {
  return {
    type: REQUEST_ONGOING,
    onSuccess: USER_LOGOUT_SUCCESS,
    onError: COUGHT_FAILURE,
    action: getLogout
  }
}

// change general information states
export function changeUserInfo(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: CHANGE_USER_INFO_SUCCESS,
    onError: COUGHT_FAILURE,
    action: updateInfo,
    payload
  }
}

// change password states
export function changeUserPassword(payload) {
  return {
    type: REQUEST_ONGOING,
    onSuccess: CHANGE_USER_PASSWORD_SUCCESS,
    onError: COUGHT_FAILURE,
    action: updatePassword,
    payload
  }
}