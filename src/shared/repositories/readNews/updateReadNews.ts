import ReadArticle from '@/shared/models/ReadArticle';
import validation from './validation';
import { NEWS_STORAGE_KEY } from '@/utils/constant';

export default function updateReadNews(payload: ReadArticle): ReadArticle | null {
  try {
    const news = validation();

    const prevNews = news.find((blog) => blog.url === payload.url);
    if (!prevNews) return null;

    const destructNews = news.filter((blog) => blog.url !== payload.url);

    const updatedNews = [...destructNews, payload];

    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(updatedNews));

    return payload;
  } catch (error) {
    return null;
  }
}
