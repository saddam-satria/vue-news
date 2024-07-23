import getHeadlineNews from '@/shared/repositories/getHeadlineNews';
import getNews from '@/shared/repositories/getNews';

const HomePageService = {
  getNews: () => {
    const news = getNews();

    return news;
  },
  getHeadlineNews: () => {
    const news = getHeadlineNews();

    return news;
  },
};

export default HomePageService;
