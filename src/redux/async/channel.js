import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};

//채널 조회
export const getChannels = createAsyncThunk(
  "channel/getChannels",
  async (data, thunkAPI) => {
    const response = await axios.post(
      "/channels/lists",
      { userId: data.userId },
      { headers }
    );
    console.log("getChannels", response.data.result);
    return response.data.result;
  }
);

//채널 생성
export const createChannel = createAsyncThunk(
  "channel/createChannel",
  async (data, thunkAPI) => {
    console.log(data)
    const createdData = {
      title: data.title,
      userList: data.userList,
      userId: data.userId,
    };
    const response = await axios.post("/channels", createdData, {
      headers: headers,
    });
    console.log(response.data);
    return createdData;
  }
);

//게시글 조회
export const getOneChannel = createAsyncThunk(
  "channel/getOneChannel",
  async (data, thunkAPI) => {
    const response = await axios.get(`/channels/${data}`, {
      headers: headers,
    });
    console.log("response", response.data.result);
    return response.data.result;
  }
);

export const getOneChannelUsers = createAsyncThunk(
  "channel/getOneChannelUsers",
  async (data, thunkAPI) => {
    const response = await axios.get(`/channels/${data}/user`, {
      headers,
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
    console.log(data);
    const chats = {
      chat: data.chat,
      img: data.img,
      channelId: data.channelId,
      userId: data.userId,
    };
    const response = await axios.post(`/channels/${data.channelId}`, chats, {
      headers: headers,
    }); 
    return chats;
  }
);

export const getchannelsUsers = createAsyncThunk(
  "channel/getchannelsUsers",
  async (data, thunkAPI) => {
    const response = await axios.get(`/channels/allUsers`, {headers: headers});
    console.log(response.data);
    return response.data.result
  }
);