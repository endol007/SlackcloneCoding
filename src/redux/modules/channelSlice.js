import { createSlice } from "@reduxjs/toolkit";
import {
  createChannel,
  getChannels,
  getOneChannel,
  getOneChannelUsers,
  sendMessage,
  exitChannel,
  sendMessageChannel,
} from "../async/channel";

const initialState = {
  channelList: null,
  sendMessageChannel: [],
  currentChannel: null,
  currentChannelUsers: null,
  sendMsg: [
    {
      channelsId: 1,
      chat: "채널 테스트",
      createdAt: "오후 3:16",
    },
  ],
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
        state.channelList = action.payload;
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.channelList.push(action.payload);
      })
      .addCase(getOneChannel.pending, (state, action) => {
        state.currentChannel = null;
      })
      .addCase(getOneChannel.fulfilled, (state, action) => {
        state.currentChannel = action.payload;
      })
      .addCase(getOneChannelUsers.pending, (state, action) => {
        state.currentChannelUsers = null;
      })
      .addCase(getOneChannelUsers.fulfilled, (state, action) => {
        state.currentChannelUsers = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        console.log(action.payload);
        state.sendMsg.unshift(action.payload);
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
