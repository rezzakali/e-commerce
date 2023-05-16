import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // increase || add cart item
    setCartItem: (state, action) => {
      const oldItemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (oldItemIndex >= 0) {
        state.cartItems[oldItemIndex].cartQuantity += 1;
        toast.info('item increased!');
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`item addedd successfully!`);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    // decrease cart item
    decreaseCartItem: (state, action) => {
      const oldItemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartItems[oldItemIndex].cartQuantity > 1) {
        state.cartItems[oldItemIndex].cartQuantity -= 1;
      } else if (state.cartItems[oldItemIndex].cartQuantity === 1) {
        const newItem = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        state.cartItems = newItem;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    // remove cart item
    removeCartItem: (state, action) => {
      const newItem = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = newItem;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.success('Item removed!');
    },

    // remove all cart items
    removeAllCartItem: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems', JSON.stringify(state.cartItems));
    },

    // Calculate total quantity and amount of all items in cart
    getTotalAmount: (state) => {
      let { total, quantity } = state.cartItems.reduce(
        (currentTotalAmount, currentCartItem) => {
          const { price, cartQuantity } = currentCartItem;
          const totalAmounts = price * cartQuantity;
          currentTotalAmount.total += totalAmounts;
          currentTotalAmount.quantity += cartQuantity;
          return currentTotalAmount;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.totalAmount = total;
      state.totalQuantity = quantity;
    },
  },
});

export const {
  setCartItem,
  getTotalAmount,
  decreaseCartItem,
  removeCartItem,
  removeAllCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
