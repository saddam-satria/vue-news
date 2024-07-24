import http from '@/config/http';

export default async function getHeadlineNews(country = 'us', page = 1, limit = 5) {
  const url = `top-headlines?country=${country}&page=${page}&pageSize=${limit}`;

  try {
    const response = await http.get(url);

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
