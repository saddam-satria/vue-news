import Article from '@/shared/models/Article';
import ReadArticle from '@/shared/models/ReadArticle';
import FetchProps from '@/shared/props/fetch.props';
import createReadNews from '@/shared/repositories/readNews/createReadNews';
import getDetailReadNews from '@/shared/repositories/readNews/getDetailReadNews';
import getReadNews from '@/shared/repositories/readNews/getReadNews';
import updateReadNews from '@/shared/repositories/readNews/updateReadNews';
import convertDate from '@/shared/services/convertDate';
import moment from 'moment';
import { Ref, ref } from 'vue';

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
  readingNews(news: Article, ref: Ref<ReadArticle[]>) {
    try {
      const result = getDetailReadNews(news.url);
      const prevNews = ref.value.filter((blog) => blog.url !== news.url);
      let updatedNews = result as ReadArticle;

      if (result) {
        const response = updateReadNews({
          ...news,
          lastReading: moment().toISOString(),
          count: result.count + 1,
        });
        if (response) {
          updatedNews = response;
        }
      }

      if (!result) {
        const response = createReadNews({
          ...news,
          lastReading: moment().toISOString(),
          count: 1,
        });

        if (response) {
          updatedNews = response;
        }
      }

      ref.value = [...prevNews, { ...updatedNews, lastReading: convertDate(updatedNews.lastReading) }];
    } catch (error) {
      const response = createReadNews({
        ...news,
        lastReading: moment().toISOString(),
        count: 1,
      });

      if (response) {
        ref.value = [...ref.value.filter((blog) => blog.url !== news.url), { ...response, lastReading: convertDate(response.lastReading) }];
      }
    }
  },
};

export default NewsReadService;
