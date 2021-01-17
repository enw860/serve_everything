import { all, fork } from 'redux-saga/effects'
import { requestRootSaga } from "./ongoingRequest"

export default function* rootSaga() {
  yield all([
    fork(requestRootSaga)
  ])
}