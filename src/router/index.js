import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Import your page components
import About from '../views/About.vue';

const routes = [
  {
    path: '/',
    redirect: '/Home', // Redirects the root path to /Home
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use history mode
  routes,
});

export default router;
