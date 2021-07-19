import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "../async/user";

const initialState = {
  isLoggingIn: false,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(logIn.pending, (state, action) => {
        state.data = null;
        state.isLoggingIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addMatcher(
        (action) => {
          return action.type.includes("/pending");
        },
        (state, action) => {
          state.isLoading = true;
          state.isDone = false;
          state.isError = null;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.includes("/fulfilled");
        },
        (state, action) => {
          state.isLoading = false;
          state.isDone = true;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.includes("/rejected");
        },
        (state, action) => {
          state.isLoading = false;
          state.isError = action.error;
        }
      ),
});

export default userSlice;
