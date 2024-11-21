import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Import your page components
import About from '../views/About.vue';

const routes = [
  {
    path: '/', // URL path for the home page
    name: 'Home',
    component: Home, // Component to render
  },
  {
    path: '/about', // URL path for the about page
    name: 'About',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use history mode
  routes,
});

export default router;
