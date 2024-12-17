<script setup>
import { DataTable, Column, Toolbar, Button, InputText } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import { ref, inject } from 'vue'; 
import * as tableFun from '../Methods/tableFun';

// Inject reactive user data
const injectedData = inject('userData');
const objects = ref(injectedData.userData);

console.log(injectedData)
console.log(objects)


//variables
const objectDialog = ref(false);
const selectedObjects = ref([]);
const dataTable = ref([]);
const object = ref({});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const columns = ref([
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email' },
]);


//får deletefunctionn til at fungere.. er der en måde at komme omkring dette så man bare kan kalde den??
async function handleDelete() {
    objects.value = await tableFun.deleteObjects0(objects, selectedObjects);
}



const openNew = () => {
    object.value = {};
    submitted.value = false;
    objectDialog.value = true;
};

</script>

<template>         

  <div>
    <div class="card">
      <Toolbar class="mb-6">
        <template #start>
            <Button 
              label="New" 
              icon="pi pi-plus" 
              class="mr-2" 
              @click="openNew" />
            <Button 
              label="Delete" 
              icon="pi pi-trash" 
              severity="danger" 
              outlined @click="handleDelete" 
              :disabled="!selectedObjects || !selectedObjects.length" />
        </template>
      </Toolbar>

      <div class="flex justify-between mb-2">
        <InputText v-model="filters['global'].value" placeholder="Search Entries..." />
      </div>
      <DataTable
        ref="dataTable"
        :value="objects"
        :filters="filters"
        :globalFilterFields="columns.map(col => col.field)"
        v-model:selection="selectedObjects"
        selectionMode="multiple" 
        stripedRows
        sortMode="multiple"
        removableSort
        paginator
        :rows="5"
        tableStyle="min-width: 50rem"
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header" sortable></Column>
      </DataTable>




    </div>
  </div>




</template>
