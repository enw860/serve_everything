import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store/index";
import App from './views/App';
import "../basic_controls/style/style.less";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('main-container'));