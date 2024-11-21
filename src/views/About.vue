<script>
import Buttonsimple from "../components/Buttonsimple.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Buttonsimple,
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
    <div>
        <h2>Intet at se her</h2>
    </div>
    <div> 
    <Redirect to="/about" buttonClass="btn-primary">
      Go to About
    </Redirect>
  </div>
</template>