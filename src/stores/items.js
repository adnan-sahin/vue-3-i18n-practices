import { ref } from 'vue';
import { defineStore } from 'pinia';
import itemsData from './data/items.js';

export const useItemsStore = defineStore('items', () => {
  const subtotal = ref(0);
  const numOfItemsInCart = ref(0);
  const itemsInCart = ref([]);
  const items = ref(itemsData);

  function addItemToCart(itemId) {
    const item = items.value.find((it) => it.id === itemId);
    const itemIndex = itemsInCart.value.findIndex((it) => it.id === itemId);

    if (itemIndex < 0) {
      itemsInCart.value.push({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
        subtotal: item.price
      });
    } else {
      itemsInCart.value[itemIndex].quantity++;
      itemsInCart.value[itemIndex].subtotal += item.price;
    }
    numOfItemsInCart.value++;
    subtotal.value += item.price;
  }

  function removeItemFromCart(itemId) {
    const itemIndex = itemsInCart.value.findIndex((it) => it.id === itemId);

    numOfItemsInCart.value--;
    subtotal.value -= itemsInCart.value[itemIndex].price;
    if (itemsInCart.value[itemIndex].quantity > 1) {
      itemsInCart.value[itemIndex].quantity--;
      itemsInCart.value[itemIndex].subtotal -=
        itemsInCart.value[itemIndex].price;
    } else {
      itemsInCart.value.splice(itemIndex, 1);
    }
  }

  function clearItemFromCart(itemId) {
    const itemIndex = itemsInCart.value.findIndex((it) => it.id === itemId);
    const itemQuantity = itemsInCart.value[itemIndex].quantity;
    const itemPrice = itemsInCart.value[itemIndex].price;

    numOfItemsInCart.value -= itemQuantity;
    subtotal.value -= itemQuantity * itemPrice;
    itemsInCart.value.splice(itemIndex, 1);
  }

  return {
    subtotal,
    numOfItemsInCart,
    itemsInCart,
    items,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart
  };
});
