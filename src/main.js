import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// import VueI18n from 'vue-i18n'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./router/intercept"
import componentPro from "@/globalComponent";
const app = createApp(App);

app.config.globalProperties.$axios = axios;

app
.use(store)
.use(router)
// .use(VueI18n)
.use(Antd)
.use(componentPro)
.mount("#app");
