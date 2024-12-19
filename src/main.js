import './assets/main.css';
import { createApp } from 'vue';
import { reactive } from 'vue';
import * as dataHandler from './dataHandler';
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
import DialogService from 'primevue/dialogservice'


const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});


//Fetcing json data for all components and views 
(async () => {
    const dataSources = [
        dataHandler.fetch0('./data/usercut.json'),
    ];

    const results = await Promise.allSettled(dataSources);

    const fetchedData = results.map((result, index) => {
        if (result.status === 'fulfilled') {
            return result.value;
        } else {
            console.error(`Failed to fetch data source ${index}:`, result.reason);
            return null; 
        }
    });

    const reactiveData = reactive({
        userData: fetchedData[0] || []
    });

    const hashmap = {};
    const idList = [];

    // Populate idList and hashmap
    fetchedData.forEach(data => {
        if (data && Array.isArray(data)) {
            const ids = data.map(obj => obj.id); // Extract ids
            idList.push(...ids);
            ids.forEach(id => { hashmap[id] = true; }); // Add to hashmap
        }
    });

    app.provide('userData', reactiveData);
    app.provide('dataIDs', hashmap);

})();


// Register the ToastService correctly
app.use(ToastService);
app.use(DialogService);

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
