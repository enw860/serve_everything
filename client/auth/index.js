import Vue from 'vue';
import Main from './Main.vue';
import store from './store/store'
import SKPlugins from "sharkquila_ui_toolkits";

Vue.use(SKPlugins)

new Vue({
    store,
    render: h => h(Main),
    renderError: e => console.error(e)
}).$mount('#main-container');