import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkUserLogin = createAsyncThunk(
  "check-user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/check-user", {
        credentials: "include",
      });

      const result = await res.json();
      if (!result.success) {
        return rejectWithValue(result.message || "user not logged in");
      }

      return result.user;
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: { loading: true, user: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserLogin.pending, (state, action) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(checkUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload ?? "something went wrong";
      });
  },
});

export default userSlice;
