const CardHeadlineProps = {
  image: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  publishedAt: {
    type: String,
    required: true,
  },
};

export default CardHeadlineProps;
