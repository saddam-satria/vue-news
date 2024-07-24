<template>
  <navbar-component />

  <div class="container mx-auto px-2 py-4">
    <div clas v-if="!news.loading.value && news.errorMessage.value" class="bg-red-500 px-4 py-2 w-full rounded-lg shadow-xl">
      <span class="text-medium text-white capitalize">{{ news.errorMessage.value }}</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3">
      <div v-if="!news.loading.value && news.data.value.length > 0" v-for="blog in news.data.value" class="h-48">
        <card-component
          :author="blog.author"
          :content="blog.content"
          :description="blog.description"
          :published="blog.publishedAt"
          :read-news="redirectTo"
          :image="blog.urlToImage"
          :source="blog.source"
          :title="blog.title"
          :last-reading="blog.lastReading"
          :url="blog.url"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavbarComponent from '@/shared/components/navbar-component.vue';
import CardComponent from '@/news/read/components/card-component.vue';
import NewsReadService from './news-read.service';
import { onMounted } from 'vue';
import Article from '@/shared/models/Article';

const newsReadService = NewsReadService;
const news = newsReadService.getNews();

onMounted(() => {
  news.action();
});

const redirectTo = (news: Article) => {
  newsReadService.readingNews(news);

  if (news.url) {
    window.open(news.url, '_blank');
  }
};
</script>
