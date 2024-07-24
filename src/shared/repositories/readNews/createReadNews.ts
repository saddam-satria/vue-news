import ReadArticle from '@/shared/models/ReadArticle';
import validation from './validation';
import { NEWS_STORAGE_KEY } from '@/utils/constant';

export default function createReadNews(payload: ReadArticle): ReadArticle | null {
  try {
    const prevNews = validation();

    const currentNews = [...prevNews, payload];

    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(currentNews));

    return payload;
  } catch (error) {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify([payload]));
    return null;
  }
}
