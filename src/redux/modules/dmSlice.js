import { createSlice } from "@reduxjs/toolkit";
import { createDM, getDMChat, sendDM, addDMChat} from "../async/dm";

const initialState = {
  // dmList: null,
  currentDM: null,
  dmChat: [],
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
      .addCase(createDM.fulfilled, (state, action) => {
        state.currentDM = action.payload[0];
      })
      .addCase(getDMChat.pending, (state, action) => {
        state.dmChat = [];
      })
      .addCase(getDMChat.fulfilled, (state, action) => {
        state.dmChat = action.payload;  //채팅기록 상태에 등록
      })
      .addCase(addDMChat.fulfilled, (state, action) => {
        state.dmChat.push(action.payload); //새로운 채팅 채팅리스트에 추가
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
