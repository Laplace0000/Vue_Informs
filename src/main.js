import './assets/main.css';
import { createApp } from 'vue';
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


const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});


app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('FileUpload', FileUpload);
app.component('Toolbar', Toolbar);
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('InputText', InputText);

app.mount('#app');
