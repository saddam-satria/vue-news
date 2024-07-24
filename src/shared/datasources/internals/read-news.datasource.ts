import ReadArticle from '@/shared/models/ReadArticle';
import convertDate from '@/shared/services/convertDate';

const ReadNewsDatasource = {
  getNews: (news: ReadArticle[]) => {
    const convertedNews = news.map((blog) => ({
      ...blog,
      publishedAt: convertDate(blog.publishedAt),
      title: blog.title ? (blog.title.length > 65 ? blog.title.slice(0, 65) + '...' : blog.title) : '-',
      description: blog.description ? (blog.description.length > 150 ? blog.description.slice(0, 150) + '...' : blog.description) : '-',
      author: blog.author ?? 'unknown',
      lastReading: convertDate(blog.lastReading),
    }));

    return convertedNews;
  },
};

export default ReadNewsDatasource;
