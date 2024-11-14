<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>username</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ person.email }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      users: [] // Initialize an empty array
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Fetch the local JSON file
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  },
  mounted() {
    this.fetchUsers(); // Call the fetch method
  }
};
</script>


