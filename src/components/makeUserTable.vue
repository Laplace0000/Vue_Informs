<script setup>
import { DataTable, Column, FileUpload, Toolbar, Button, InputText } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import { ref } from 'vue'; 
import * as tableFun from '../Methods/tableFun';

const { userData } = defineProps(['userData'])

const deleteDialog = ref(false);
const users = ref([]);
const products = ref([]);
const columns = ref([]);
const dt = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
  <div class="card">

    <Toolbar class="mb-6">
      <template #start>
          <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="tableFun.confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
      </template>

      <template #end>
          <FileUpload mode="basic" accept="application/json" :maxFileSize="1000000" label="Import" customUpload chooseLabel="Import" class="mr-2" auto :chooseButtonProps="{ severity: 'secondary' }" />
          <Button label="Export" icon="pi pi-upload" severity="secondary" @click="dt.value.exportCSV()" />
      </template>
    </Toolbar>

    <div class="flex justify-between mb-2">
      <InputText v-model="filters['global'].value" placeholder="Search Entries..." />
    </div>
    <DataTable
      ref="dt"
      :value="userData"
      :filters="filters"
      :globalFilterFields="columns.map(col => col.field)"
      :selection="selectedProduct"
      stripedRows
      sortMode="multiple"
      removableSort
      paginator
      :rows="5"
      tableStyle="min-width: 50rem"
    >
    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
    <Column field ="id" header = "ID" sortable  ></Column>
    <Column field ="name" header = "Name" sortable  ></Column>
    <Column field ="email" header = "Email" sortable  ></Column>
    </DataTable>        
    <Column :exportable="false" style="min-width: 12rem">
      <template #body="slotProps">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
      </template>
    </Column>
  </div>
  <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle !text-3xl" />
      <span v-if="user">Are you sure you want to delete user?</span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text @click="deleteDialog = false" />
      <Button label="Yes" icon="pi pi-check" text @click="deleteSelected" />
    </template>
  </Dialog>
</template>
