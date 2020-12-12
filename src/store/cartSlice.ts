import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'store/store';
import {Product} from "models/Product";
import {CartItem} from "models/CartItem";
import API_PATHS from "../constants/apiPaths";
import axios from 'axios';

const profileCartUrl = `${API_PATHS.cart}/profile/cart`;

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateFromApi: (state, { payload: { items } }: PayloadAction<CartState>) => {
      return {
        items: [
            ...items,
        ],
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addToCart: (state, action: PayloadAction<Product>) => {
      const {items} = state;
      const {payload: product} = action;
      const existingItem = items.find(i => i.product.id === product.id);
      if (existingItem) {
        existingItem.count++;
        return;
      }
      items.push({product, count: 1});
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    removeFromCart: (state, action: PayloadAction<Product>) => {
      let {items} = state;
      const {payload: product} = action;
      const existingItem = items.find(i => i.product.id === product.id);
      if (!existingItem) return;
      if (existingItem.count > 1) {
        existingItem.count--;
        return;
      }
      state.items = items.filter(i => i.product.id !== product.id);
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const addToCart = createAsyncThunk<void, Product, {state: RootState}>('cart/addToCart', async (product: Product, {dispatch, getState}) => {
  dispatch(cartSlice.actions.addToCart(product));
  const { cart: { items } } = getState();
  console.log('addToCart',items)
  await putProducts(items);
})

export const removeFromCart = createAsyncThunk<void, Product, {state: RootState}>('cart/removeFromCart', async(product: Product, {dispatch, getState}) => {
  dispatch(cartSlice.actions.removeFromCart(product));
  const { cart: { items } } = getState();
  console.log('removeFromCart',items)
  await putProducts(items);
})

export const clearCart = createAsyncThunk<void, void, {state: RootState}>('cart/removeFromCart', async( _, {dispatch, getState}) => {
  dispatch(cartSlice.actions.clearCart());
  const { cart: { items } } = getState();
  console.log('clearCart', items)
  await putProducts(items);
})

const putProducts = async (items: CartItem[]) => {
  await axios.put(profileCartUrl, { items }, {
    headers: {
      Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
    },
  })
}

export const {updateFromApi} = cartSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.cart.value)`
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
