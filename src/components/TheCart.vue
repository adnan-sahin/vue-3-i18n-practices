<script>
import { mapState, mapActions } from 'pinia';
import { useItemsStore } from '@/stores/items';

export default {
  data() {
    return {
      cartVisible: false,
      itemAddedAnimation: false
    };
  },
  computed: {
    ...mapState(useItemsStore, ['itemsInCart', 'numOfItemsInCart', 'subtotal'])
  },
  methods: {
    ...mapActions(useItemsStore, [
      'addItemToCart',
      'removeItemFromCart',
      'clearItemFromCart'
    ]),
    toggleCart() {
      if (this.numOfItemsInCart > 0) {
        this.cartVisible = !this.cartVisible;
      }
    }
  },
  watch: {
    numOfItemsInCart(itemsNum) {
      if (itemsNum === 0) {
        this.cartVisible = false;
      }
      this.itemAddedAnimation = true;
      setTimeout(() => {
        this.itemAddedAnimation = false;
      }, 200);
    }
  }
};
</script>

<template>
  <div class="cartButton" @click="toggleCart">
    {{ $t('cart.cart') }}
    <span :class="['total', { totalChanged: itemAddedAnimation }]">{{
      numOfItemsInCart
    }}</span>
  </div>
  <Teleport to="body">
    <div class="cartItems" :style="{ display: cartVisible ? 'block' : 'none' }">
      <h3 class="col numOfItems">
        {{ $t('cart.items', numOfItemsInCart) }}
      </h3>
      <h3 class="col">
        {{ $t('cart.subtotal') }}: {{ $n(subtotal, 'currencyFormat') }}
      </h3>
      <div class="col" v-for="item in itemsInCart" :key="item.id">
        <div class="item">
          <h3>{{ item.title }}</h3>
          <p>{{ $n(item.subtotal, 'currencyFormat') }}</p>
          <p class="itemQuantity">
            <button @click="addItemToCart(item.id)">+</button>
            <span>{{ item.quantity }}</span>
            <button @click="removeItemFromCart(item.id)">-</button>
          </p>
          <button class="clearButton" @click="clearItemFromCart(item.id)">
            {{ $t('cart.clearButton') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.cartButton {
  position: fixed;
  top: 15px;
  right: 20px;
  padding: 20px;
  background-color: #ea8300;
  color: #ffffff;
  border-radius: 10px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
}

.cartItems {
  position: fixed;
  top: 95px;
  right: 20px;
  width: 431px;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  background-color: #db7b00;
  border-radius: 11px;
  overflow-y: scroll;
  height: 400px;
  scrollbar-width: thin;
  scrollbar-color: #888 #ddd;
}

.total {
  background-color: white;
  border-radius: 30px;
  padding: 5px 10px;
  margin-left: 5px;
  margin-right: 10px;
  color: black;
  transition: all 0.2s;
}

.totalChanged {
  background-color: #ea8300;
}

.col {
  float: left;
  width: 100%;
  margin-top: 20px;
}

.item {
  box-shadow: 6px 5px 6px 0px rgb(0 0 0 / 20%);
  padding: 16px;
  background-color: #f7f7f7;
  height: 14rem;
  color: black;
}

.itemQuantity button {
  background-color: #000000;
  border: none;
  color: white;
  padding: 5px 20px;
  height: 45px;
  width: 60px;
  text-decoration: none;
  font-size: 25px;
  cursor: pointer;
  border-radius: 6px;
}

.itemQuantity span {
  margin: 0 15px;
  font-size: 20px;
}

.clearButton {
  background-color: #fb3535;
  border: none;
  color: white;
  padding: 8px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 6px;
}

.numOfItems {
  padding: 0px;
  margin: 0px;
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
