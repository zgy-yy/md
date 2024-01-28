import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import {createPinia} from "pinia";
import VScroll from "./directive/v-scroll.ts";
import {VLazy} from "@/directive/v-lazy.ts";
import "@/assets/css/common.scss"
import {VLoading} from "@/directive/v-loading.ts";

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.directive('loading', VLoading)
app.directive('scroll', VScroll)
app.directive('lazy', VLazy)

app.mount('#app')

