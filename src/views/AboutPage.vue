<script>
import { mapState } from 'pinia';
import { useItemsStore } from '@/stores/items';

export default {
  computed: {
    ...mapState(useItemsStore, ['items'])
  }
};
</script>

<template>
  <div class="about">
    <h1>{{ $t('routes.about') }}</h1>
    <p>{{ $t('aboutUs.firstParagraph') }}</p>
    <p>{{ $t('aboutUs.secondParagraph') }}</p>
    <p>{{ $t('aboutUs.popularItem', { itm: items[0].title }) }}</p>
  </div>
</template>

<style scoped>
.about {
  padding: 50px 100px;
  font-size: 22px;
}
</style>
