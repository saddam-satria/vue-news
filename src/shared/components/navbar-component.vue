<template>
  <div class="bg-blue-900 py-4 text-white">
    <div class="mx-auto container px-2">
      <div class="flex space-x-4">
        <RouterLink :to="menu.url" v-for="(menu, index) in NavbarDatasource" :key="index" :class="['text-medium text-white', { 'font-bold': currentPath === menu.url }]" class="text-decoration-none">{{ menu.title }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router';
import NavbarDatasource from '../datasources/internals/navbar-menus.datasource';

const route = useRoute();
const currentPath = route.path;
</script>
