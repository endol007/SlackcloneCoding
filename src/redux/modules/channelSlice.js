import { createSlice } from "@reduxjs/toolkit";
import {
  createChannel,
  getChannels,
  getOneChannel,
  getOneChannelUsers,
  sendMessageChannel,
  exitChannel,
  getchannelsUsers,
} from "../async/channel";

const initialState = {
  channelList: [],
  currentChannel: null,
  currentChannelUsers: null,
  getOneChannelUsers: null,
  getchannelsUsers: null,
  sendMsg: [],
  isLoading: false,
  isDone: false,
  isError: false,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getChannels.pending, (state, action) => {
        state.channelList = null;
      })
      .addCase(getChannels.fulfilled, (state, action) => {
        state.channelList = action.payload;   //채널리스트
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        window.location.reload();
      })
      .addCase(getOneChannel.pending, (state, action) => {
        state.currentChannel = null;
      })
      .addCase(getOneChannel.fulfilled, (state, action) => {
        state.currentChannel = action.payload;
      })
      .addCase(getOneChannelUsers.pending, (state, action) => {
        state.getOneChannelUsers = null; 
      })
      .addCase(getOneChannelUsers.fulfilled, (state, action) => {
        state.getOneChannelUsers = action.payload; //채널에 등록된 사용자 리스트
      })
      .addCase(getchannelsUsers.fulfilled, (state, action) => {
        state.getchannelsUsers = action.payload; //전체 사용자 등록
      })
      .addCase(sendMessageChannel.fulfilled, (state, action) => {
        state.currentChannel.push(action.payload); //게시글 상태에 등록
      })
      .addCase(exitChannel.fulfilled, (state, action) => {
        state.currentChannel = null;
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

export default channelSlice;
