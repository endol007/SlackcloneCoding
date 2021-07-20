import { createSlice } from "@reduxjs/toolkit";
import { signUp, logIn, getUser, dupCheckUser } from "../async/user";

const initialState = {
  userList: null,
  currentUser: null,
  isLoading: false,
  isDone: false,
  isError: false,
  dupCheck: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state, action) => {
      sessionStorage.removeItem("access_token");
      state.currentUser = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signUp.pending, (state, action) => {
        state.currentUser = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(logIn.pending, (state, action) => {
        state.userList = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        sessionStorage.setItem("access_token", action.payload.result);
      })
      .addCase(getUser.pending, (state, action) => {
        state.userList= [];
      })
      .addCase(getUser.fulfilled, (state, action) => {
        // state.userList.find(
        //   (user) => user.id === parseInt(action.payload.userId)
        // );
        state.userList.push(action.payload);
      })
      .addCase(dupCheckUser.pending, (state, action) => {
        state.dupCheck = false;
      })
      .addCase(dupCheckUser.fulfilled, (state, action) => {
        if (action.payload === "ok") {
          state.dupCheck = true;
        } else {
          state.dupCheck = false;
        }
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
          console.log(action.error);
        }
      ),
});

export const { logOut } = userSlice.actions;

export default userSlice;
