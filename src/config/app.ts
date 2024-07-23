import App from '@/app.vue';
import { createApp } from 'vue';
import { OhVueIcon } from 'oh-vue-icons';
import { createPinia } from 'pinia';
import router from './route';

export default function () {
  const pinia = createPinia();
  return createApp(App).use(pinia).use(router).component('v-icon', OhVueIcon).mount('#app');
}
