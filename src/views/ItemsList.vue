<script setup>
import { useItemsStore } from '@/stores/items';
import { useI18n } from 'vue-i18n';

const { n, d, t } = useI18n();

const store = useItemsStore();

const truncateDescription = (desc, limit) =>
  desc.length > limit ? desc.slice(0, limit) + '...' : desc;
</script>

<template>
  <div class="card-container">
    <div class="card" v-for="item in store.items" :key="item.id">
      <div class="card-title">{{ item.title }}</div>
      <!-- <p class="card-price">{{ n(item.price, 'currencyFormat') }}</p> -->
      <i18n-n
        class="card-price"
        :value="item.price"
        tag="p"
        format="currencyFormat"
      >
        <template #fraction="slotProps">
          <small> {{ slotProps.fraction }} </small>
        </template>
      </i18n-n>
      <div class="card-description">
        {{ truncateDescription(item.description, 70) }}
      </div>
      <div class="card-date">
        {{ t('items.posted') }}: {{ d(item.date, 'shortFormat') }}
      </div>
      <button class="add-to-cart" @click="store.addItemToCart(item.id)">
        {{ t('items.addToCart') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}
.card {
  border: 1px solid #7f8c8d;
  margin: 15px;
  padding: 15px;
  flex: 1 1 calc(25% - 30px);
  box-sizing: border-box;
  background-color: #34495e;
  color: #b3e5fc;
  border-radius: 10px;
  text-align: center;
}
.card-title {
  font-size: 23px;
  font-weight: bold;
  color: #b3e5fc;
}
.card-description {
  color: #b3e5fc;
  margin: 20px 0;
}
.card-date {
  color: #b3e5fc;
  margin: 10px 0;
}
.card-price {
  color: #ea8300;
  font-size: 20px;
  font-weight: bold;
}
.add-to-cart {
  background-color: #bb393f;
  color: #ffffff;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.1s;
}
.add-to-cart:hover {
  background-color: #ff7043;
}
.add-to-cart:active {
  transform: scale(0.95);
}
</style>
