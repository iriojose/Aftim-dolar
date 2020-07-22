import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import toasted from './plugins/toasted';
import head from "./plugins/head";
import meta from "./plugins/meta";
import money from "./plugins/money.js";

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    toasted,
    money,
    head,
    meta,
    render: h => h(App)
}).$mount('#app')
