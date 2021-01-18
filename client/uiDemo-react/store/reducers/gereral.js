function onCoughtFailure(state, action) {
  return Object.assign({}, state, {
    error: {
      state: false,
      data: (action && action.payload)? action.payload : {}
    }
  });
}

function onRequestFailure(state, action) {
  return Object.assign({}, state, {
    error: {
      state: false,
      data: (action && action.payload)? action.payload : {}
    }
  });
}

export const generalReducerRoot = {
  REQUEST_FAILURE: onRequestFailure,
  COUGHT_FAILURE: onCoughtFailure
}