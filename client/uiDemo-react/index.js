import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store/index";
import App from './views/App';
import Demo from './views/Demo';
import "../controls/style/style.less";

ReactDOM.render(
  <Provider store={store}>
    {/* <App /> */}
    <Demo />
  </Provider>, 
  document.getElementById('main-container'));