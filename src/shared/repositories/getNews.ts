import http from '@/config/http';
import Article from '../models/Article';
import Response from '../models/Response';

export default async function getNews(q = 'cnn', page = 1, limit = 10): Promise<Response<Article[]>> {
  const url = `everything?q=${q}&page=${page}&pageSize=${limit}`;
  try {
    const response = await http.get(url);

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
