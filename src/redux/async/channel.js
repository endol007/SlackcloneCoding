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

export const exitChannel = createAsyncThunk(
  "channel/exitChannel",
  async (data, thunkAPI) => {
    const response = await axios.delete(`/channels/${data.channelId}`);
    console.log("response", response.data);
    return response.data;
  }
);

export const sendMessageChannel = createAsyncThunk(
  "channel/sendMessageChannel",
  async (data, thunkAPI) => {
      const chats = {
        title: data.title,
        description: data.description,
        img: data.img,
        channelId: data.channelId,
        userId: data.userId, 
      }
      //const response = await axios.post(`/chats/1`, chats);  ///chats/${dmsId}
      return chats;
  }
)