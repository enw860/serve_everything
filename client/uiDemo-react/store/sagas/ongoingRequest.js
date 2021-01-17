import { REQUEST_FAILURE, REQUEST_ONGOING } from "../const/general";
import { put, takeEvery, all, call, fork } from 'redux-saga/effects'

function* requestHandlerSaga(action){
  if (!action) return;

  try {
    var data = yield call(action.action, action.payload);
    var type = data.hasOwnProperty("message")? action.onError : action.onSuccess;
    
    yield put({ type: type, payload: data});
  } catch (error) {
    yield put({type: REQUEST_FAILURE, payload: error})
  }
}

function* requestHandlerSagaWatcher(){
  yield takeEvery(REQUEST_ONGOING, requestHandlerSaga);
}

export function *requestRootSaga() {
	yield all([
    fork(requestHandlerSagaWatcher)
	])
}
