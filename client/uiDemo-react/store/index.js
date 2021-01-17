import rootReducer from "./reducers/index";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// import reducer from './reducers'
import rootSaga from './sagas/index'
const initialiseSagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(initialiseSagaMiddleware)  
);

initialiseSagaMiddleware.run(rootSaga);

export default store;
