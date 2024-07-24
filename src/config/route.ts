import HomePageService from '@/homepage/homepage.service';
import Homepage from '@/homepage/homepage.vue';
import NewsReadService from '@/news/read/news-read.service';
import NewsRead from '@/news/read/news-read.vue';
import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: HomePageService.routePath,
    component: Homepage,
    name: HomePageService.routeName,
  },
  {
    path: NewsReadService.routePath,
    component: NewsRead,
    name: NewsReadService.routeName,
  },
];

const router = createRouter({ routes, history: createMemoryHistory() });

export default router;
