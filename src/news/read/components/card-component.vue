<template>
  <div class="w-full h-full">
    <div class="flex h-full p-4" :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover' }">
      <div class="mt-auto flex flex-col space-y-2 w-full">
        <span class="text-gray-200 text-medium">Terakhir dibaca</span>
        <span class="text-white text-extra font-bold">{{ title }}</span>
        <div class="flex justify-between items-center">
          <div class="flex space-x-2">
            <span class="text-gray-300 text-small">{{ source.name }}</span>
            <span class="text-gray-300 text-small">-</span>
            <span class="text-gray-300 text-small">{{ lastReading }}</span>
          </div>
          <a @click="redirectHandler" :href="url" class="text-decoration-none px-2 py-1 border-gray-200 border-2 text-white rounded-lg text-medium">baca lagi</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Article, { Source } from '@/shared/models/Article';

const props = defineProps<{
  title: string;
  image: string;
  source: Source;
  url: string;
  description: string;
  author: string;
  published: string;
  content: string;
  lastReading: string;
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
