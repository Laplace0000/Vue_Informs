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
        const response = await fetch('/data.json'); // Fetch the local JSON file
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





<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="person in people" :key="person.id">
        <td>{{ person.name }}</td>
        <td>{{ person.age }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      people: [
        { id: 1, name: "John", age: 30 },
        { id: 2, name: "Jane", age: 25 }
      ]
    };
  }
};
</script>
