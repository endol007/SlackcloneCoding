import { createSlice } from "@reduxjs/toolkit";
import { signUp, logIn, getUser, dupCheckUser } from "../async/user";

const initialState = {
  userList: null,
  currentUser: null,
  isLoading: false,
  isDone: false,
  isError: false,
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
      .addCase(getUser.pending, (state, action) => {
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(dupCheckUser.fulfilled, (state, action) => {
        // 이메일 중복 체크
        if (action.payload===true) {
          alert("사용 가능한 이메일입니다.");
        }else{
          alert("이미 가입된 아이디입니다")
        }
      })
      .addCase(dupCheckUser.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(signUp.fulfilled, (state, action) => {
        window.location.href = "/";  //회원가입 성공하면 로그인페이지로
      })
      .addCase(logIn.pending, (state, action) => {
        // 로그인
        state.userList = null;
        state.currentUser = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        sessionStorage.setItem("access_token", action.payload);
        window.location.reload();
      })
      // 공통
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
