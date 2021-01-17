import { REQUEST_FAILURE } from "../const/general";

function onRequestFailure(payload){
  return {
    type: REQUEST_FAILURE,
    payload
  }
}