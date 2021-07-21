import { createSlice } from "@reduxjs/toolkit";
import { signUp, logIn, getUser, dupCheckUser } from "../async/user";
import {history} from "../configureStore";
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
        // state.currentUser = action.payload;
      })
      .addCase(logIn.pending, (state, action) => {
        state.userList = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        sessionStorage.setItem("access_token", action.payload.result);
        window.location.href = "/workspace";
      })
      .addCase(getUser.pending, (state, action) => {
        state.currentUser = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        // state.userList.push(action.payload);
      })
      .addCase(dupCheckUser.pending, (state, action) => {
        state.dupCheck = false;
      })
      .addCase(dupCheckUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.dupCheck = true;
          alert("사용 가능한 이메일입니다.");
        } else {
          state.dupCheck = false;
          alert("사용할 수 없는 이메일입니다.");
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
