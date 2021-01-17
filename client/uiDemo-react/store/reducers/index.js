import { userReducerRoot } from "./user";
import { generalReducerRoot } from "./gereral";

const initState = {
  user: {},
  workspace: {},
  lastCall:{}
};

const reducers = Object.assign({}, userReducerRoot, generalReducerRoot);

function rootReducer(state = initState, action) {
  if (reducers.hasOwnProperty(action.type)) {
    var reducedFunc = reducers[action.type];
    return reducedFunc(state, action);
  }
  return state;
}

export default rootReducer;