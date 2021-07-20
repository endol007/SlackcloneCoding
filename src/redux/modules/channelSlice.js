import { createSlice } from "@reduxjs/toolkit";
import {
  createChannel,
  getChannels,
  getOneChannel,
  getOneChannelUsers,
  sendMessageChannel,
  exitChannel,
} from "../async/channel";

const initialState = {
  channelList: null,
  sendMessageChannel: [],
  currentChannel: null,
  currentChannelUsers: null,
  sendMsg: null,
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
      .addCase(sendMessageChannel.fulfilled, (state, action) => {
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
