import ReadNewsDatasource from '@/shared/datasources/internals/read-news.datasource';
import validation from './validation';

export default function getReadNews() {
  try {
    const parsedNews = validation();

    return ReadNewsDatasource.getNews(parsedNews);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
