<script setup>
import { DataTable, Column, FileUpload, Toolbar, Button, InputText } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import { ref, inject } from 'vue'; 
import * as tableFun from '../Methods/tableFun';
import Buttonsimple from './Buttonsimple.vue';
import Dialog from 'primevue/dialog';


// Inject reactive user data
const injectedData = inject('userData');
const objects = ref(injectedData.userData);

console.log(injectedData)
console.log(objects)

//variables
const objectDialog = ref(false);
const selectedObjects = ref([]);
const submitted = ref([]);
const dataTable = ref([]);
const object = ref({});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const columns = ref([
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
]);


//får deletefunctionn til at fungere.. er der en måde at komme omkring dette så man bare kan kalde den??
function handleDelete() {
    if (!selectedObjects.value || !selectedObjects.value.length) return;
    objects.value = objects.value.filter(obj => !selectedObjects.value.includes(obj));
    selectedObjects.value = []; // Clear selection
}

function onFileUpload(event) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const data = JSON.parse(reader.result);
        objects.value = data; // Update table data with uploaded file content
    };
    reader.readAsText(file);
}


function openNew(){
    object.value = {};
    submitted.value = false;
    objectDialog.value = true;
};


function saveObject() {
    submitted.value = true;

    if (!object.value.name) return; 
    object.value.id = tableFun.createID(objects); 
    objects.value.push({ ...object.value }); 
    objectDialog.value = false;  
    console.log(objects.value)
    object.value = {};  
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
              outlined @click="handleDelete" 
              :disabled="!selectedObjects || !selectedObjects.length" />
        </template>

        <template #end>
            <FileUpload 
              mode="basic" 
              accept="application/json" 
              :maxFileSize="1000000" 
              name="file" 
              @uploader = "onFileUpload"
            >
              <template #chooseButton>
                <buttonsimple @click="$refs.fileInput.click()" buttonClass="btn-primary">Choose File</buttonsimple>
              </template>
            </FileUpload>
            <Button 
            label="Export" 
            icon="pi pi-upload" 
            severity="secondary" 
            @click="tableFun.exportCSV(dataTable)" />
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
      <Dialog
        v-model:visible="objectDialog"
        :style="{ width: '450px' }"
        header="Add User"
        :modal="true"
      >
        <div class="flex flex-col gap-6">
          <div>
            <label for="name" class="block font-bold mb-3">Name</label>
            <InputText
              id="name"
              v-model.trim="object.name"
              required="true"
              autofocus
              :invalid="submitted && !object.name"
              fluid
            />
            <small v-if="submitted && !object.name" class="text-red-500"
              >Name is required.</small
            >
          </div>

        </div>

        <template #footer>
          <Button 
            label="Cancel" 
            icon="pi pi-times" 
            text 
            @click="() => { 
              const { objectDialog: dialogValue, submitted: submittedValue } = tableFun.hideDialog(objectDialog, submitted); 
              objectDialog = dialogValue; 
              submitted = submittedValue; 
            }" 
          />          
          <Button label="Save" icon="pi pi-check" @click="saveObject" />
        </template>
      </Dialog>
    </div>
  </div>


  

</template>
