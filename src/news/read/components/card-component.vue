<template>
  <div class="rounded-lg shadow-lg w-full h-full justify-between flex flex-col">
    <div class="w-full h-1/2">
      <div v-if="!image" class="bg-gray-100 h-full flex">
        <span class="text-medium m-auto">image not found</span>
      </div>
      <img v-if="image" class="object-cover w-full h-full rounded-t-lg" :src="image" alt="" />
    </div>
    <div class="flex flex-col px-3 py-4 h-1/2">
      <div class="flex space-x-1 items-center">
        <span class="text-blue-400 text-small">{{ count }}x dibaca</span>
      </div>
      <div class="mt-auto">
        <span class="text-blue-900 text-extra font-bold">{{ title }}</span>
      </div>

      <div class="flex justify-between items-center mt-auto">
        <div class="flex space-x-2">
          <span class="text-blue-300 text-small">{{ source.name }}</span>
          <span class="text-blue-300 text-small">-</span>
          <span class="text-blue-300 text-small">{{ lastReading }}</span>
        </div>
        <a @click="redirectHandler" class="cursor-pointer text-decoration-none px-2 py-1 border-blue-800 border-2 text-black rounded-lg text-medium capitalize">baca lagi</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Article, { Source } from '@/shared/models/Article';

const props = defineProps<{
  title: string;
  image?: string;
  source: Source;
  url: string;
  description?: string;
  author?: string;
  published: string;
  content?: string;
  lastReading: string;
  count: number;
  readNews: (news: Article) => void;
}>();

const redirectHandler = () => {
  props.readNews({
    title: props.title,
    urlToImage: props.image,
    source: {
      name: props.source.name,
      id: props.source.id,
    },
    url: props.url,
    description: props.description,
    author: props.author,
    publishedAt: props.published,
    content: props.content,
  });
};
</script>
