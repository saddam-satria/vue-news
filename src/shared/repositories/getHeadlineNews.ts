import http from '@/config/http';
import { ref } from 'vue';
import Article from '../models/Article';

export default function getHeadlineNews() {
  const loading = ref<boolean>(true);
  const errorMessage = ref<string>('');
  const data = ref<Article[]>([]);

  const action = async () => {
    try {
      const response = await http.get('top-headlines?country=us');

      data.value = response.data.articles;
    } catch (error: any) {
      errorMessage.value = error.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    errorMessage,
    data,
    action,
  };
}
