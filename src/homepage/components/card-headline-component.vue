<template>
  <div class="w-full h-full">
    <div class="flex h-full p-4" :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover' }">
      <div class="mt-auto flex flex-col space-y-2">
        <span class="text-gray-200 text-medium">{{ source }}</span>
        <span class="text-white text-extra font-bold">{{ title }}</span>
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
import CardHeadlineProps from '../props/card-headline.props';

defineProps(CardHeadlineProps);
</script>
