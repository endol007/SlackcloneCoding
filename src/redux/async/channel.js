import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};

export const getChannels = createAsyncThunk(
  "channel/getChannels",
  async (data, thunkAPI) => {
    const response = await axios.get("/channels", { headers: headers });
    console.log("response", response.data);
    return response.data;
  }
);

//채널 생성
export const createChannel = createAsyncThunk(
  "channel/createChannel",
  async (data, thunkAPI) => {
    const createdData = {
      title: data.title,
      userList: data.userList,
      userId: data.userId,
    };
    const response = await axios.post("/channels", createdData, {
      headers: headers,
    });
    console.log("response", response.data);
    return createdData;
  }
);

//게시글 조회
export const getOneChannel = createAsyncThunk(
  "channel/getOneChannel",
  async (data, thunkAPI) => {
    const response = await axios.get(`/channels/${data.channelId}`, {
      headers: headers,
    });
    console.log("response", response.data);
    return response.data;
  }
);

export const getOneChannelUsers = createAsyncThunk(
  "channel/getOneChannelUsers",
  async (data, thunkAPI) => {
    const response = await axios.get(`/channels/${data.channelId}/user`, {
      headers: headers,
    });
    console.log("response", response.data.result);
    return response.data.result;
  }
);

export const exitChannel = createAsyncThunk(
  "channel/exitChannel",
  async (data, thunkAPI) => {
    const response = await axios.delete(`/channels/${data.channelId}`, {
      headers: headers,
    });
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
    };
    const response = await axios.post(`/comments`, chats, { headers: headers }); ///chats/${dmsId}
    return chats;
  }
);
