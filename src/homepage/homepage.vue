<script lang="ts" setup>
import { onMounted, onUpdated, ref } from 'vue';
import HomePageService from './homepage.service';
import CardComponent from '@/shared/components/card-component.vue';
import SearchComponent from '@/shared/components/search-component.vue';
import CardSkeltonComponent from '@/shared/components/card-skelton-component.vue';
import httpErrorHandler from '@/shared/services/errorHandler';

const homeService = HomePageService;
const news = homeService.getNews();
const headlineNews = homeService.getHeadlineNews();
const gridSystem = ref(new Map());
const page = ref(0);
const totalData = ref(10);
const keyword = ref('');

onMounted(() => {
  news.action();
  headlineNews.action();
});

onUpdated(() => {
  setGrid();
});

const setGrid = () => {
  const pattern = [7, 3];
  let currentTotal = 0;
  let currentIndex = 0;

  while (currentTotal < news.data.value.length) {
    if (currentIndex > 1) {
      currentIndex = 0;
    }

    gridSystem.value.set(currentTotal, currentTotal);
    currentTotal += pattern[currentIndex];
    currentIndex++;
  }
};

const searchHandler = async (value: string) => {
  news.loading.value = true;
  news.data.value = [];
  news.action(value);
  news.loading.value = false;
  keyword.value = value;
  page.value = 1;
};

const loadMore = () => {
  const currentValue = page.value + 1;

  news.loading.value = true;
  news.action(keyword.value ? keyword.value : undefined, currentValue, totalData.value);
  news.loading.value = false;
  page.value += 1;
};

const imageBanner = 'https://nextgen.web.id/wp-content/uploads/2021/11/aplikasi-Virtual-Reality-di-android-1.jpg';
</script>

<template>
  <div class="bg-blue-900 py-4 text-white">
    <div class="mx-auto container px-2">
      <div class="flex space-x-4">
        <span v-for="(_, index) in [0, 1, 2, 3, 4]" :key="index" :class="['text-medium text-white', { 'font-bold': index == 0 }]">asds</span>
      </div>
    </div>
  </div>
  <div class="container mx-auto px-2 space-y-4 py-4">
    <search-component :search-handler="searchHandler" />

    <!-- v-if="!news.errorMessage.value" -->
    <div class="grid grid-cols-1 lg:grid-cols-3 grid-rows-4 h-80 gap-1">
      <div class="row-span-4 grid-rows-subgrid bg-blue-400">
        <div class="w-full h-full">
          <div class="flex h-full p-4 bg-blue-500" :style="{ backgroundImage: 'url(' + imageBanner + ')', backgroundSize: 'cover' }">
            <div class="mt-auto flex flex-col space-y-2">
              <span class="text-gray-200 text-medium">{{ 'source' }}</span>
              <span class="text-white text-extra font-bold">{{ 'title' }}</span>
              <div class="flex space-x-2">
                <span class="text-gray-300 text-small">{{ 'author' }}</span>
                <span class="text-gray-300 text-small">{{ 'asdsa' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-cols-subgrid col-span-2 grid-rows-subgrid row-span-2 bg-blue-400">
        <div class="w-full h-full">
          <div class="flex h-full p-4 bg-blue-500" :style="{ backgroundImage: 'url(' + imageBanner + ')', backgroundSize: 'cover' }">
            <div class="mt-auto flex flex-col space-y-2">
              <span class="text-gray-200 text-medium">{{ 'source' }}</span>
              <span class="text-white text-extra font-bold">{{ 'title' }}</span>
              <div class="flex space-x-2">
                <span class="text-gray-300 text-small">{{ 'author' }}</span>
                <span class="text-gray-300 text-small">{{ 'asdsa' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blue-400 grid-rows-subgrid row-span-2">
        <div class="w-full h-full">
          <div class="flex h-full p-4 bg-blue-500" :style="{ backgroundImage: 'url(' + imageBanner + ')', backgroundSize: 'cover' }">
            <div class="mt-auto flex flex-col space-y-2">
              <span class="text-gray-200 text-medium">{{ 'source' }}</span>
              <span class="text-white text-extra font-bold">{{ 'title' }}</span>
              <div class="flex space-x-2">
                <span class="text-gray-300 text-small">{{ 'author' }}</span>
                <span class="text-gray-300 text-small">{{ 'asdsa' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blue-400 row-span-2">
        <div class="w-full h-full">
          <div class="flex h-full p-4 bg-blue-500" :style="{ backgroundImage: 'url(' + imageBanner + ')', backgroundSize: 'cover' }">
            <div class="mt-auto flex flex-col space-y-2">
              <span class="text-gray-200 text-medium">{{ 'source' }}</span>
              <span class="text-white text-extra font-bold">{{ 'title' }}</span>
              <div class="flex space-x-2">
                <span class="text-gray-300 text-small">{{ 'author' }}</span>
                <span class="text-gray-300 text-small">{{ 'asdsa' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="news.loading.value && news.data.value.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <card-skelton-component v-for="(_, index) in news.data.value" :key="index" @click="console.log(index)"></card-skelton-component>
    </div>
    <div v-if="news.loading.value && news.data.value.length < 1" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <card-skelton-component v-for="(_, index) in [0, 1, 2]" :key="index" @click="console.log(index)"></card-skelton-component>
    </div>

    <div v-if="news.errorMessage.value" class="bg-red-500 px-4 py-2 w-full rounded-lg shadow-xl">
      <span class="text-medium text-white capitalize">{{ httpErrorHandler(news.errorMessage.value) }}</span>
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
        :source="blog.source.name"
        :image="blog.urlToImage"
        :url="blog.url"
        :id="index"
      />
    </div>

    <div v-if="news.data.value.length > 0" class="flex justify-center">
      <button @click="loadMore" :class="['p-2 border-2 border-gray-200 rounded-lg text-medium', { 'border-blue-900': news.loading.value }]">Load More</button>
    </div>
  </div>
</template>
