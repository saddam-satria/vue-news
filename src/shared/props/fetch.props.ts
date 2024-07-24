import { Ref } from 'vue';

interface FetchProps<T, D> {
  errorMessage: Ref<string>;
  loading: Ref<boolean>;
  data: Ref<T>;
  action: D;
}

export default FetchProps;
