import ReadArticle from '@/shared/models/ReadArticle';
import validation from './validation';

export default function getDetailReadNews(id: string): ReadArticle | null {
  try {
    const parsedNews = validation();

    const news = parsedNews.find((blog) => blog.url === id);
    return news ?? null;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
