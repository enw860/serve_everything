import Vue from 'vue';
import Main from './Main.vue';
import store from './store/store'
import "../controls/style/style.less";

new Vue({
    store,
    render: h => h(Main),
    renderError: e => console.error(e)
}).$mount('#main-container');