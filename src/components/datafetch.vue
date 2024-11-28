<script>
import { DataTable, Column } from 'primevue';
import { ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';

export default {
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
    <div class="flex justify-between mb-2">
      <InputText v-model="filters['global'].value" placeholder="Search users..." />
    </div>
    <DataTable
      :value="users"
      v-model:filters="filters"
      :globalFilterFields="['name', 'username', 'email']"
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
  </div>
</template>
