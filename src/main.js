import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/common.css";
import "./styles/page.css";
import "./styles/icon/iconfont.css";
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUI);


Vue.prototype.$apiBaseUrl = process.env.VUE_APP_API_BASE_URL;


new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

