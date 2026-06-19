import {createApp} from 'vue';
import Notes from './Notes.vue';
import '../css/app.css';

import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(Notes);

app.use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-right'
});

app.mount('#app');
