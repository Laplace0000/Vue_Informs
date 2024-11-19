<script>
import datafetch from './components/datafetch.vue';

export default {
  components: {
    datafetch, // Register the component with this name
  },
};
</script>

<template>
  <div id="app">
    <h1>User List</h1>
    <datafetch /> <!-- Use the correct name here -->
  </div>
</template>
