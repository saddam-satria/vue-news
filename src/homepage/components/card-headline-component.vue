<template>
  <div class="w-full h-full">
    <div class="flex h-full p-4 bg-blue-900" :style="{ backgroundImage: 'url(' + 'https://cdn.wallpapersafari.com/24/29/wrin4A.jpg' + ')', backgroundSize: 'cover' }">
      <div class="mt-auto flex flex-col space-y-2">
        <span class="text-gray-200 text-medium">{{ source.name }}</span>
        <a @click="redirectHandler" class="text-decoration-none cursor-pointer">
          <span class="font-bold text-extra capitalize text-white">{{ title }}</span>
        </a>
        <div class="flex space-x-2">
          <span class="text-gray-300 text-small">{{ author }}</span>
          <span class="text-gray-300 text-small">-</span>
          <span class="text-gray-300 text-small">{{ publishedAt }}</span>
        </div>
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
  publishedAt: string;
  content?: string;
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
    publishedAt: props.publishedAt,
    content: props.content,
  });
};
</script>
