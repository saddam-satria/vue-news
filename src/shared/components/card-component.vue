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
        <v-icon name="fa-regular-user" class="text-medium text-gray-500" />
        <span class="text-gray-400 text-xsmall">{{ author ? author : 'unknown' }}</span>
      </div>
      <div>
        <a :href="url" class="text-decoration-none" target="_blank">
          <span class="font-bold text-medium capitalize">{{ title!.length > 70 ? title!.slice(0, 70) + '...' : title }}</span>
        </a>
      </div>
      <div>
        <span v-if="description" class="text-gray-400 text-small">{{ description!.length > 150 ? description!.slice(0, 150) + '...' : description }}</span>
      </div>
      <div class="flex space-x-2 mt-auto">
        <div class="flex space-x-1 items-center">
          <v-icon name="la-building-solid" class="text-medium text-gray-500" />
          <span class="text-gray-400 text-xsmall">{{ source }}</span>
        </div>
        <div class="flex space-x-1 items-center">
          <v-icon name="bi-clock" class="text-medium text-gray-500" />
          <span class="text-gray-400 text-xsmall">{{ moment(published).format('ddd, DD MMM HH.ss') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addIcons } from 'oh-vue-icons';
import { FaRegularUser, FcLikePlaceholder, FcLike } from 'oh-vue-icons/icons';
import { LaBuildingSolid } from 'oh-vue-icons/icons';
import { BiClock } from 'oh-vue-icons/icons';
import cardProps from '../props/card.props';
import moment from 'moment';

addIcons(FaRegularUser, LaBuildingSolid, BiClock, FcLikePlaceholder, FcLike);
defineProps(cardProps);
</script>
