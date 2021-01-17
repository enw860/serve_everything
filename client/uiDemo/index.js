import Vue from 'vue';
import UIDemo from './uiDemo.vue';
import store from './store/store'
import "../basic_controls/style/style.less";

new Vue({
  store,
  render: h => h(UIDemo),
  renderError: e => console.error(e)
}).$mount('#main-container');