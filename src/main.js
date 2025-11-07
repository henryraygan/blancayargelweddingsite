import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./styles/main.scss";
import gsap from "./plugins/gsap";


createApp(App).use(store).use(router).mount('#app')
