import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
  image: any;
  quantity: number;
}

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingProduct = state.cart.find(
        item => item.id === action.payload.id,
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const existingProduct = state.cart.find(
        item => item.id === action.payload,
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const existingProduct = state.cart.find(
        item => item.id === action.payload,
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      }
    },
    setCart(state, action: PayloadAction<Product[]>) {
      state.cart = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCart,
} = cartSlice.actions;
export default cartSlice.reducer;
