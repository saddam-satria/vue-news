import http from '@/config/http';
import { ref } from 'vue';
import Article from '../models/Article';

export default function getNews() {
  const loading = ref<boolean>(true);
  const errorMessage = ref<string>('');
  const data = ref<Article[]>([]);

  const action = async (q: string = 'cnn', page = 1, limit = 10) => {
    try {
      const response = await http.get(`everything?q=${q}&page=${page}&pageSize=${limit}`);

      if (data.value.length > 0) {
        const currentData = [...data.value, ...response.data.articles];

        data.value = currentData;
        return;
      }

      if (data.value.length < 1) {
        data.value = response.data.articles;

        return;
      }
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
