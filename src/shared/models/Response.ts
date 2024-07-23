interface Response<T> {
  status: string;
  totalResults: number;
  articles: T;
}

export default Response;
