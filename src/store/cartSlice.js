import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getCartLocalStorage = () => {
  if (typeof window !== "undefined") {
    const products = localStorage.getItem("cartProducts");
    return products ? JSON.parse(products) : [];
  }

  return [];
};
export const saveCartLocalStorage = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartProducts", JSON.stringify(cart));
  }
};

export const getCartItems = createAsyncThunk(
  "cart-items",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/cart-items", {
        credentials: "include",
      });

      const result = await res.json();
      if (!result.success) {
        return rejectWithValue(result.message || "some error");
      }

      return result.cartItems;
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { loading: true, cartItems: [] },
  reducers: {
    addToCart: (state, action) => {
      const product = state.cartItems.find(
        (val) => val._id === action.payload._id,
      );
      if (product) {
        product.qty++;
      } else {
        state.cartItems.push({ ...action.payload, qty: 1 });
      }
      saveCartLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (val) => val._id !== action.payload,
      );

      saveCartLocalStorage(state.cartItems);
    },
    updateQty: (state, action) => {
      const product = state.cartItems.find(
        (val) => val._id === action.payload.id,
      );

      if (action.payload.delta === "increase") {
        product.qty += 1;
      } else {
        if (product.qty > 1) {
          product.qty -= 1;
        }
      }

      saveCartLocalStorage(state.cartItems);
    },

    emptyCart: (state) => {
      state.cartItems = [];
      saveCartLocalStorage(state.cartItems);
    },
    getGuestCartData: (state) => {
      state.cartItems = getCartLocalStorage() ?? [];
    },
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.cartItems = [];
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.loading = false;
        state.cartItems = [];
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  emptyCart,
  getGuestCartData,
  setCartLoading,
} = cartSlice.actions;

export default cartSlice;
