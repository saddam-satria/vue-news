import ReadArticle from '@/shared/models/ReadArticle';
import { NEWS_STORAGE_KEY } from '@/utils/constant';

const validation = (): ReadArticle[] => {
  const rawNews = localStorage.getItem(NEWS_STORAGE_KEY);
  if (!rawNews) throw new Error('empty news');

  const parsedNews: ReadArticle[] = JSON.parse(rawNews as string);

  if (parsedNews.length < 1) throw new Error('empty news');

  const blog = parsedNews[0];

  if (!('title' in blog) || !('source' in blog) || !('image' in blog) || !('lastReading' in blog) || !('url' in blog)) throw new Error('wrong format');

  return parsedNews;
};

export default validation;
