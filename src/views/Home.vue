<script>
import { useRouter } from "vue-router";
import Buttonsimple from '../components/Buttonsimple.vue';
import MakeTable from "../components/makeTable.vue";
import vueTable from "../components/vueTable.vue";

export default {
  components: {
    MakeTable, // Register table
    Buttonsimple,  // Register MyButton
    vueTable //regsiter other table
  },
  setup() {
    const router = useRouter(); // Access Vue Router instance

    const goToAboutPage = () => {
      router.push("/about"); // Redirect to the About page
    };

    return { goToAboutPage };
  },
};
</script>



<template>
  <div class="card">
    <h1 style="font-size: 2rem; color: #007bff; text-align: center; margin-bottom: 20px;">  User-Data - local source</h1>
    <MakeTable :users="'/src/data/user.json'"/> 
  </div>
    <Buttonsimple @click="goToAboutPage">Go to About</Buttonsimple>

</template>


