<script>
import Buttonsimple from "../components/Buttonsimple.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Buttonsimple,
  },
  setup() {
    const router = useRouter(); // Access Vue Router instance

    const goToHomePage = () => {
      router.push("/Home"); // Redirect to the Home page
    };

    return { goToHomePage };
  },
};
</script>

<template>
  <div id="app">
    <h2>Intet at se her</h2>
    <Buttonsimple @click="goToHomePage">Go to Home</Buttonsimple>
  </div>
</template>
