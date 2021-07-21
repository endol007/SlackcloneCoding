import { createSlice } from "@reduxjs/toolkit";
import { createDM, getDMChat, sendDM } from "../async/dm";

const initialState = {
  // dmList: null,
  currentDM: null,
  dmChat: null,
  isLoading: false,
  isDone: false,
  isError: false,
};

const dmSlice = createSlice({
  name: "dm",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // .addCase(getDMList.pending, (state, action) => {
      //   // DM 목록
      //   state.dmList = null;
      // })
      // .addCase(getDMList.fulfilled, (state, action) => {
      //   state.dmList = action.payload;
      // })
      .addCase(createDM.fulfilled, (state, action) => {
        // DM 목록 생성
        state.currentDM = action.payload;
        // window.location.reload();
      })
      .addCase(getDMChat.pending, (state, action) => {
        // 채팅 기록
        state.dmChat = null;
      })
      .addCase(getDMChat.fulfilled, (state, action) => {
        state.dmChat = action.payload;
      })
      .addCase(sendDM.fulfilled, (state, action) => {
        // 채팅 전송
        state.dmChat.unshift(action.payload);
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

export default dmSlice;
