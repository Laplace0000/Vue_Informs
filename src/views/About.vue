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
  <div class="card">
    <h1 style="font-size: 2rem; color: #007bff; text-align: center; margin-bottom: 20px;">  User-Data - empty source</h1>
  </div>
    <Buttonsimple @click="goToHomePage">Go to Home</Buttonsimple>
</template>

