import { createApp } from 'vue'
import './style.css'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

const apiKey = import.meta.env.VITE_TMDB_API;

axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Accept'] = 'application/json'

library.add(fas)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')