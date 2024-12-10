import './assets/main.css';
import { createApp } from 'vue';
import * as dataFetch from './dataFetch';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import FileUpload from 'primevue/fileupload';
import Toolbar from 'primevue/toolbar';
import ColumnGroup from 'primevue/columngroup';   
import Row from 'primevue/row';                   
import InputText from 'primevue/inputtext';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast'; // Import the Toast component

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
(async () => {
    // Call the dataFetch function to get data
    const fetchedUserData = await dataFetch.fetch0('./data/user.json'); // Use relative path to your data file

    // Pass the data as a global property or directly to the root component
    app.provide('userData', fetchedUserData); // Using Vue's provide/inject for global access
})();

// Register the ToastService correctly
app.use(ToastService);

// Register components
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('FileUpload', FileUpload);
app.component('Toolbar', Toolbar);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('InputText', InputText);
app.component('Toast', Toast);

app.mount('#app');
