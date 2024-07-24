export interface Source {
  name: string;
  id: string;
}

interface Article {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
  source: Source;
  author?: string;
}

export default Article;
