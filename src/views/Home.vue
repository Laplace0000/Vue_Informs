<script>
import { useRouter } from "vue-router";
import { inject } from 'vue';
import Buttonsimple from '../components/Buttonsimple.vue';
import makeSimpleTable from "../components/makeSimpleTable.vue";

export default {
  components: {
    Buttonsimple,  // Register MyButton
    makeSimpleTable,
  },
  setup() {
    const router = useRouter(); // Access Vue Router instance

    const fetchedUserData = inject("userData");

    const goToAboutPage = () => {
      router.push("/about"); // Redirect to the About page
    };

    return { goToAboutPage, fetchedUserData };
  },
};
</script>



<template>
  <div class="card">
    <h1 style="font-size: 2rem; color: #007bff; text-align: center; margin-bottom: 20px;">  User-Data - local source</h1>
    <makeSimpleTable/>
  </div>
    <Buttonsimple @click="goToAboutPage">Go to About</Buttonsimple>

</template>


