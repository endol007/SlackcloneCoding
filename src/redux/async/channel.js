import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getChannels = createAsyncThunk(
  "channel/getChannels",
  async (data, thunkAPI) => {
    const response = await axios.get("/channels");
    console.log("response", response.data);
    return response.data;
  }
);

export const createChannel = createAsyncThunk(
  "channel/createChannel",
  async (data, thunkAPI) => {
    const createdData = {
      title: data.title,
      userList: data.userList,
    };
    const response = await axios.post("/channels", createdData);
    console.log("response", response.data);
    return createdData;
  }
);

export const getOneChannel = createAsyncThunk(
  "channel/getOneChannel",
  async (data, thunkAPI) => {
    const response = await axios.get(`/channels/${data.channelId}`);
    console.log("response", response.data);
    return response.data;
  }
);

export const getOneChannelUsers = createAsyncThunk(
  "channel/getOneChannelUsers",
  async (data, thunkAPI) => {
    const response = await axios.get(`/channels/${data.channelId}/user`);
    console.log("response", response.data.result);
    return response.data.result;
  }
);

export const sendMessage = createAsyncThunk(
  "channel/sendMessage",
  async (data, thunkAPI) => {
    const chatData = {
      userId: data.userId,
      chat: data.message,
    };
    console.log("chatData", chatData);
    // const response = await axios.post(`/channels/${data.channelId}`, chatData);
    return chatData;
  }
);

export const exitChannel = createAsyncThunk(
  "channel/exitChannel",
  async (data, thunkAPI) => {
    const response = await axios.delete(`/channels/${data.channelId}`);
    console.log("response", response.data);
    return response.data;
  }
);
