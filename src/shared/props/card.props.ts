export default {
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  source: {
    type: String,
    required: true,
  },
  published: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  readNews: {
    type: Function,
    required: true,
  },
};
