<script>
import { DataTable, Column } from 'primevue';
export default {
  data() {
    return {
      users: [], // Initialize an empty array to hold the fetched data
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // API call
        const data = await response.json(); // Parse JSON response
        this.users = data; // Assign the fetched data to the users array
      } catch (error) {
        console.error('Error fetching users:', error); // Handle errors
      }
    },
  },
  mounted() {
    this.fetchUsers(); // Fetch users when the component is mounted
  },
};
</script>



<template>
  <div class="card">
    <DataTable :value="users" tableStyle="min-width: 50rem">
      <Column field="name" header="Name"></Column>
      <Column field="username" header="Username"></Column>
      <Column field="email" header="Email"></Column>
    </DataTable>
  </div>
</template>
