<template>
  <div id="app">
    <!-- Global Layout Example -->
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </header>

    <!-- Route-specific Content -->
    <router-view />

    <footer>
      <p>© Informs</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Global Styles */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

header {
  background-color: #35495e;
  padding: 10px 20px;
  color: white;
}

header nav {
  display: flex;
  gap: 10px;
  justify-content: center;
}

footer {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f4f4f4;
  color: #333;
}
</style>
