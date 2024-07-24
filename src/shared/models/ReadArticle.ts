import Article from './Article';

interface ReadArticle extends Article {
  lastReading: string;
  count: number;
}

export default ReadArticle;
