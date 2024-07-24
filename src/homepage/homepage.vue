<template>
  <navbar-component />

  <div class="container mx-auto px-2 space-y-4 py-4">
    <search-component :search-handler="searchHandler" />

    <div clas v-if="(!news.loading.value && news.errorMessage.value) || (!headlineNews.loading.value && headlineNews.errorMessage.value)" class="bg-red-500 px-4 py-2 w-full rounded-lg shadow-xl">
      <span class="text-medium text-white capitalize">{{ httpErrorHandler(news.errorMessage.value) }}</span>
    </div>

    <div v-if="!headlineNews.loading.value && headlineNews.data.value.length > 0" class="grid grid-cols-1 lg:grid-cols-3 grid-rows-4 h-80 gap-1">
      <div class="lg:row-span-4 lg:grid-rows-subgrid bg-blue-400">
        <card-headline-component
          :author="headline.get(0)!.author"
          :image="headline.get(0)!.urlToImage"
          :published-at="headline.get(0)!.publishedAt"
          :source="headline.get(0)!.source.name"
          :title="headline.get(0)!.title"
        ></card-headline-component>
      </div>
      <div class="lg:grid-cols-subgrid lg:col-span-2 lg:grid-rows-subgrid lg:row-span-2 bg-blue-400">
        <card-headline-component
          :author="headline.get(1)!.author"
          :image="headline.get(1)!.urlToImage"
          :published-at="headline.get(1)!.publishedAt"
          :source="headline.get(1)!.source.name"
          :title="headline.get(1)!.title"
        ></card-headline-component>
      </div>
      <div class="bg-blue-400 lg:grid-rows-subgrid lg:row-span-2">
        <card-headline-component
          :author="headline.get(2)!.author"
          :image="headline.get(2)!.urlToImage"
          :published-at="headline.get(2)!.publishedAt"
          :source="headline.get(2)!.source.name"
          :title="headline.get(2)!.title"
        ></card-headline-component>
      </div>
      <div class="bg-blue-400 lg:row-span-2">
        <card-headline-component
          :author="headline.get(3)!.author"
          :image="headline.get(3)!.urlToImage"
          :published-at="headline.get(3)!.publishedAt"
          :source="headline.get(3)!.source.name"
          :title="headline.get(3)!.title"
        ></card-headline-component>
      </div>
    </div>

    <div v-if="news.loading.value || headlineNews.loading.value" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <card-skelton-component v-for="(_, index) in [0, 1, 2]" :key="index" @click="console.log(index)"></card-skelton-component>
    </div>

    <div v-if="!news.loading.value" :class="`grid grid-cols-1 grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 gap-4`">
      <card-component
        v-for="(blog, index) in news.data.value"
        :key="index"
        :class="`${gridSystem.has(index) ? 'grid-rows-subgrid row-span-2' : ''}`"
        :title="blog.title"
        :description="blog.description"
        :published="blog.publishedAt"
        :author="blog.author"
        :source="blog.source"
        :image="blog.urlToImage"
        :url="blog.url"
        :id="index"
        :content="blog.content"
        :read-news="redirectTo"
      />
    </div>

    <div v-if="news.data.value.length > 0" class="flex justify-center">
      <button @click="loadMore" :class="['p-2 border-2 border-gray-200 rounded-lg text-medium', { 'border-blue-900': news.loading.value }]">Load More</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, ref } from 'vue';
import HomePageService from '@/homepage/homepage.service';
import CardComponent from '@/shared/components/card-component.vue';
import SearchComponent from '@/shared/components/search-component.vue';
import CardSkeltonComponent from '@/shared/components/card-skelton-component.vue';
import NavbarComponent from '@/shared/components/navbar-component.vue';
import CardHeadlineComponent from '@/homepage/components/card-headline-component.vue';
import httpErrorHandler from '@/shared/services/errorHandler';
import Article from '@/shared/models/Article';

const homeService = HomePageService;
const news = homeService.getNews();
const headlineNews = homeService.getHeadlineNews();
const gridSystem = ref<Map<number, number>>(new Map());
const page = ref(0);
const totalData = ref(10);
const keyword = ref('');

const headline = ref<Map<number, Article>>(new Map());

onMounted(() => {
  news.action();
  headlineNews.action();
});

onUpdated(() => {
  homeService.setGrid(gridSystem, news.data.value.length);

  if (headlineNews.data.value.length > 3) {
    headlineNews.data.value.forEach((news, index) => {
      headline.value.set(index, news);
    });
  }
});

const searchHandler = async (value: string) => {
  homeService.searchNews(news, value);
  keyword.value = value;
  page.value = 1;
};

const loadMore = () => {
  const currentValue = page.value + 1;
  homeService.loadMore(news, keyword.value ? keyword.value : undefined, currentValue, totalData.value);
  page.value += 1;
};

const redirectTo = (news: Article) => {
  homeService.readingNews(news);

  if (news.url) {
    window.open(news.url, '_blank');
  }
};
</script>
