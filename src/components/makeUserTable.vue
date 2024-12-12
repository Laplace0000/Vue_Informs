<script setup>
import { DataTable, Column, FileUpload, Toolbar, Button, InputText } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import { ref, inject } from 'vue'; 
import * as tableFun from '../Methods/tableFun';
import { useToast } from 'primevue/usetoast';

// Inject reactive user data
const injectedData = inject('userData');
const objects = injectedData.userData

console.log(injectedData)
console.log(objects)


//variables
const dt = ref();
const selectedObjects = ref([]);
const toast = useToast();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const columns = ref([
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email' },
]);





const deleteObjects = () => {
    if (!selectedObjects.value || !selectedObjects.value.length) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'No objects selected', life: 3000 });
        return;
    }

    // Filter out the selected objects from the userData
    objects.value = objects.value.filter(
        obj => !selectedObjects.value.some(selected => selected.id === obj.id)
    );

    // Clear the selection
    selectedObjects.value = [];

    // Show success message
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Selected Objects Deleted', life: 3000 });
};



function handleFileUpload(event) {
  const file = event.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      objects.value = Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Invalid JSON format:", error.message);
    }
  };
  reader.readAsText(file);
}

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
              outlined @click="deleteObjects" 
              :disabled="!selectedObjects || !selectedObjects.length" />
        </template>

        <template #end>
            <FileUpload 
            mode="basic" 
            accept="application/json" 
            :maxFileSize="1000000" 
            label="Import" 
            customUpload 
            chooseLabel="Import" 
            class="mr-2" 
            auto :chooseButtonProps="{ severity: 'secondary' }" />
            <Button 
            label="Export" 
            icon="pi pi-upload" 
            severity="secondary" 
            @click="tableFun.exportCSV(dt)" />
        </template>
      </Toolbar>

      <div class="flex justify-between mb-2">
        <InputText v-model="filters['global'].value" placeholder="Search Entries..." />
      </div>
      <DataTable
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
       
      <Column :exportable="false" style="min-width: 12rem">
        <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
        </template>
      </Column>
    </div>
  </div>




</template>
