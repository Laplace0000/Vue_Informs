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
  <div id="app">
    <h1>User List</h1>
    <datafetch /> <!-- Use the correct name here -->
    
  </div>
    <Redirect to="/about" buttonClass="btn-primary">
      Go to About
    </Redirect>
</template>


