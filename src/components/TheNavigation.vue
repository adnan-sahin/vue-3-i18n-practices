<script setup>
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

import TheCart from '@/components/TheCart.vue';
import TheLanguagePicker from '@/components/TheLanguagePicker.vue';
</script>

<template>
  <div class="nav">
    <div>
      <span class="logo">Globoshop</span>
      <RouterLink :to="`/${locale}/items`">{{ t('routes.items') }}</RouterLink>
      <RouterLink :to="`/${locale}/about`">{{ t('routes.about') }}</RouterLink>
      <TheLanguagePicker />
      <TheCart />
    </div>
  </div>
</template>

<style scoped>
.logo {
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  font-family: Roboto Mono;
  margin-right: 20px;
}
.nav {
  padding: 20px;
  background-color: #34495e;
  border-bottom: 1px solid #7f8c8d;
  color: #b3e5fc;
}
.nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
  padding: 30px 30px 28px 30px;
}
.nav a:hover {
  margin-right: 15px;
  text-decoration: none;
  color: #34495e;
  font-weight: bold;
  background-color: white;
  padding: 30px 30px 28px 30px;
}
.nav a.router-link-active {
  margin-right: 15px;
  text-decoration: none;
  color: #34495e;
  font-weight: bold;
  background-color: white;
  padding: 30px 30px 28px 30px;
}
</style>
