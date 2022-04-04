import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { STORE } from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

createApp(App).use(STORE).use(router).use(VueAxios, axios).mount("#app");
