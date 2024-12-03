
<script>
import { DataTable, Column, FileUpload, Toolbar, Button, InputText } from 'primevue';
import { ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';

export default {
  components: {
    Toolbar,
    Button,
    InputText,
    Column,
    DataTable,
    FileUpload,
  },
  setup() {
    const users = ref([]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      users.value = await response.json();
    };

    fetchUsers();

    const clearFilter = () => {
      filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    };

    return { users, filters, clearFilter };
  },
};
</script>

<template>
  <div class="card">

    <Toolbar class="mb-6">
      <template #start>
          <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
      </template>

      <template #end>
          <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" customUpload chooseLabel="Import" class="mr-2" auto :chooseButtonProps="{ severity: 'secondary' }" />
          <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
      </template>
    </Toolbar>

    <div class="flex justify-between mb-2">
      <InputText v-model="filters['global'].value" placeholder="Search users..." />
    </div>
    <DataTable
      :value="users"
      :filters="filters"
      :globalFilterFields="['id', 'name', 'username', 'email']"
      stripedRows
      sortMode="multiple"
      removableSort
      paginator
      :rows="5"
      tableStyle="min-width: 50rem"
    >
      <Column field="id" header="ID" sortable></Column>
      <Column field="name" header="Name" sortable></Column>
      <Column field="username" header="Username" sortable></Column>
      <Column field="email" header="Email" sortable></Column>
    </DataTable>
    <Column :exportable="false" style="min-width: 12rem">
      <template #body="slotProps">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
      </template>
    </Column>



  </div>
</template>
