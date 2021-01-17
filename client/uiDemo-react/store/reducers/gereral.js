import {
  REQUEST_FAILURE,
  COUGHT_FAILURE
} from "../const/general";

function onCoughtFailure(state, action) {
  return Object.assign({}, state, {
    lastCall:{
      state: false,
      reason: (action && action.payload)? action.payload : {}
    }
  });
}

function onRequestFailure(state, action) {
  return Object.assign({}, state, {
    lastCall:{
      state: false,
      reason: (action && action.payload)? action.payload : {}
    }
  });
}

export const generalReducerRoot = {
  REQUEST_FAILURE: onRequestFailure,
  COUGHT_FAILURE: onCoughtFailure
}