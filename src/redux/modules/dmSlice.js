import { createSlice } from "@reduxjs/toolkit";
import { getDmUsers, createDM, getAllDM, sendDM } from "../async/dm";

const initialState = {
  dmList: null,
  // sendDM: null,
  chatData: null,
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
      .addCase(getDmUsers.pending, (state, action) => {
        state.dmList = null;
      })
      .addCase(getDmUsers.fulfilled, (state, action) => {
        state.dmList = action.payload;
      })
      .addCase(createDM.fulfilled, (state, action) => {
        state.dmList.push(action.payload);
      })
      .addCase(getAllDM.pending, (state, action) => {
        state.chatData = null;
      })
      .addCase(getAllDM.fulfilled, (state, action) => {
        state.chatData = action.payload;
      })
      .addCase(sendDM.fulfilled, (state, action) => {
        state.chatData.unshift(action.payload);
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

export default dmSlice;
