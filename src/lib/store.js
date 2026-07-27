import cartSidedebar from "@/store/cartSidebarSlice";
import cartSlice from "@/store/cartSlice";
import userSlice from "@/store/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice.reducer,
      user: userSlice.reducer,
      cartSidebar: cartSidedebar.reducer,
    },
  });
};

makeStore;
