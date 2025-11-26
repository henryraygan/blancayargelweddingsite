import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./styles/main.scss";
import gsap from "./plugins/gsap";

const app = createApp(App)

// Ignorar etiquetas personalizadas como <ion-icon> o <ion-button>
app.config.compilerOptions.isCustomElement = (tag) => /^ion-/.test(tag)

app.use(store)
app.use(router)
app.mount('#app')
