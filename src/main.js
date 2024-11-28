import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import aura from '@primevue/themes/aura';


const app = createApp(App); // Create the app instance
app.use(router); 
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#app');
