import Homepage from '@/homepage/homepage.vue';
import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: Homepage,
    name: 'homepage',
  },
];

const router = createRouter({ routes, history: createMemoryHistory() });

export default router;
