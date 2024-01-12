import { Basket } from "../../models/basket";
import { createSlice } from "@reduxjs/toolkit";

interface BasketState {
  basket: Basket | null;
}

const initialState: BasketState = {
  basket: null,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIdex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIdex === -1 || itemIdex === undefined) return;
      state.basket!.items[itemIdex].quantity -= quantity;
      if (state.basket?.items[itemIdex].quantity === 0) {
        state.basket.items.splice(itemIdex, 1);
      }
    },
  },
});

export const { setBasket, removeItem } = basketSlice.actions;
