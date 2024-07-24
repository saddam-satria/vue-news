import NewsDatasource from '@/shared/datasources/externals/news.datasource';
import Article from '@/shared/models/Article';
import FetchProps from '@/shared/props/fetch.props';
import getDetailReadNews from '@/shared/repositories/readNews/getDetailReadNews';
import getHeadlineNews from '@/shared/repositories/getHeadlineNews';
import getNews from '@/shared/repositories/getNews';
import { ref, Ref } from 'vue';
import createReadNews from '@/shared/repositories/readNews/createReadNews';
import moment from 'moment';
import updateReadNews from '@/shared/repositories/readNews/updateReadNews';

const HomePageService = {
  routeName: 'homepage',
  routePath: '',
  getNews: (): FetchProps<Article[], (q?: string, page?: number, limit?: number) => void> => {
    const loading = ref(false);
    const data = ref<Article[]>([]);
    const errorMessage = ref('');

    const action = async (q = 'cnn', page = 1, limit = 10) => {
      try {
        loading.value = true;
        const response = await getNews(q, page, limit);
        if (data.value.length > 0) {
          const currentData = [...data.value, ...NewsDatasource.getNews(response.articles)];
          data.value = currentData;
          return;
        }

        if (data.value.length < 1) {
          data.value = NewsDatasource.getNews(response.articles);
          return;
        }

        errorMessage.value = '';
      } catch (error: any) {
        errorMessage.value = error.message;
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      data,
      errorMessage,
      action,
    };
  },
  getHeadlineNews: (): FetchProps<Article[], (q?: string, page?: number, limit?: number) => void> => {
    const loading = ref(false);
    const data = ref<Article[]>([]);
    const errorMessage = ref('');

    const action = async (country = 'us', page = 1, limit = 4) => {
      try {
        loading.value = true;
        const news = await getHeadlineNews(country, page, limit);

        if (news) {
          data.value = NewsDatasource.getNews(news.articles);
        }

        errorMessage.value = '';
      } catch (error: any) {
        errorMessage.value = error.message;
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      data,
      errorMessage,
      action,
    };
  },
  searchNews: (ref: FetchProps<Article[], (q?: string, page?: number, limit?: number) => void>, q = 'cnn') => {
    try {
      ref.loading.value = true;
      ref.data.value = [];
      ref.action(q);
    } catch (error: any) {
      ref.errorMessage = error.message;
    } finally {
      ref.loading.value = false;
    }
  },

  loadMore: (ref: FetchProps<Article[], (q?: string, page?: number, limit?: number) => void>, q = 'cnn', page = 1, limit = 10) => {
    try {
      ref.loading.value = true;
      ref.action(q, page, limit);
    } catch (error: any) {
      ref.errorMessage = error.message;
    } finally {
      ref.loading.value = false;
    }
  },

  setGrid: (ref: Ref<Map<number, number>>, size: number) => {
    const pattern = [7, 3];
    let currentTotal = 0;
    let currentIndex = 0;

    while (currentTotal < size) {
      if (currentIndex > 1) {
        currentIndex = 0;
      }

      ref.value.set(currentTotal, currentTotal);
      currentTotal += pattern[currentIndex];
      currentIndex++;
    }
  },

  readingNews(news: Article) {
    try {
      const result = getDetailReadNews(news.url);

      if (result) {
        updateReadNews({
          ...news,
          lastReading: moment().toISOString(),
          count: result.count + 1,
        });
      }

      if (!result) {
        createReadNews({
          ...news,
          lastReading: moment().toISOString(),
          count: 1,
        });
      }
    } catch (error) {
      createReadNews({
        ...news,
        lastReading: moment().toISOString(),
        count: 1,
      });
    }
  },
};

export default HomePageService;
