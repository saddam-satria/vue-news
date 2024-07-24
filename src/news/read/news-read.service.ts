import Article from '@/shared/models/Article';
import ReadArticle from '@/shared/models/ReadArticle';
import FetchProps from '@/shared/props/fetch.props';
import createReadNews from '@/shared/repositories/readNews/createReadNews';
import getDetailReadNews from '@/shared/repositories/readNews/getDetailReadNews';
import getReadNews from '@/shared/repositories/readNews/getReadNews';
import updateReadNews from '@/shared/repositories/readNews/updateReadNews';
import moment from 'moment';
import { ref } from 'vue';

const NewsReadService = {
  routeName: 'news-read',
  routePath: '/news-read',
  getNews: (): FetchProps<ReadArticle[], () => void> => {
    const errorMessage = ref('');
    const data = ref<ReadArticle[]>([]);
    const loading = ref(false);

    const action = () => {
      try {
        const news = getReadNews();

        data.value = news;
      } catch (error: any) {
        errorMessage.value = error.message;
      } finally {
        loading.value = false;
      }
    };

    return {
      data,
      errorMessage,
      loading,
      action,
    };
  },
  readingNews(news: Article) {
    try {
      const result = getDetailReadNews(news.url);

      if (result) {
        updateReadNews({
          ...news,
          lastReading: moment().add(7, 'hours').toISOString(),
          count: result.count + 1,
        });
      }

      if (!result) {
        createReadNews({
          ...news,
          lastReading: moment().add(7, 'hours').toISOString(),
          count: 1,
        });
      }
    } catch (error) {}
  },
};

export default NewsReadService;
