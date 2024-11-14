<script>
import datafetch from './components/datafetch.vue'

export default {
  components: {
    datafetch, // Register the component
  },
};
</script>

<template>
  <div id="app">
    <h1>User List</h1>
    <UserTable /> 
  </div>
</template>