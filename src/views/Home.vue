<script>
import datafetch from '../components/datafetch.vue';
import MyButton from '../components/Buttonsimple.vue';
import { useRouter } from "vue-router";

export default {
  components: {
    datafetch, // Register datafetch
    MyButton,  // Register MyButton
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
    <h1 style="font-size: 2rem; color: #007bff; text-align: center; margin-bottom: 20px;">  User-Data </h1>
    <datafetch /> 
    
  </div>
    <MyButton @click="goToAboutPage">Go to About</MyButton>

</template>


