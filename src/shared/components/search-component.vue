<template>
  <div class="flex space-x-2">
    <div class="flex space-x-4 p-2 w-full border-gray-200 rounded-xl border-2 items-center">
      <v-icon name="io-search-sharp" class="text-medium" />
      <input @keyup="searchHandlerKeyup" @input="handleInput" type="text" class="text-medium focus:outline-none w-full" placeholder="search...." />
    </div>
    <button @click="searchHandler" class="border-gray-200 border-2 rounded-xl p-2 text-medium">submit</button>
  </div>
</template>

<script lang="ts" setup>
import { addIcons } from 'oh-vue-icons';
import { IoSearchSharp } from 'oh-vue-icons/icons';
import { ref } from 'vue';
addIcons(IoSearchSharp);

const keyword = ref('');

const handleInput = (event: Event) => {
  keyword.value = (event.target as HTMLInputElement).value;
};

const props = defineProps<{ searchHandler?: (value: string) => void }>();

const searchHandler = () => {
  if (props.searchHandler) {
    props.searchHandler(keyword.value); // Pass arguments to the callback
  }
};

const searchHandlerKeyup = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && props.searchHandler) {
    props.searchHandler(keyword.value);
  }
};
</script>
