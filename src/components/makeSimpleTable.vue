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
</script>

<template>         

  <div>
    <div class="card">
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
