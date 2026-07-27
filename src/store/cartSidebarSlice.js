import { createSlice } from "@reduxjs/toolkit";

const cartSidedebar = createSlice({
  name: "cart-sidebar",
  initialState: false,
  reducers: {
    setSidebar: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSidebar } = cartSidedebar.actions;

export default cartSidedebar;
