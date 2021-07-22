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
    return createdData;
  }
);

//게시글 조회
export const getOneChannel = createAsyncThunk(
  "channel/getOneChannel",
  async (data, thunkAPI) => {
    const channel = thunkAPI.getState().channel.channelList;
    const index = channel.findIndex((p) => p.id == data);
    const channelId = channel[index].channelId;
    const response = await axios.get(`/channels/${channelId}`, {
      headers: headers,
    });
    return response.data.result;
  }
);
//채널에 등록된 사용자 조회
export const getOneChannelUsers = createAsyncThunk(
  "channel/getOneChannelUsers",
  async (data, thunkAPI) => {
    const channel = thunkAPI.getState().channel.channelList;
    const index = channel.findIndex((p) => p.id == data)
    const channelId = channel[index].channelId
    const response = await axios.get(`/channels/${channelId}/users`, {
      headers,
    });
    return response.data.result;
  }
);

export const exitChannel = createAsyncThunk(
  "channel/exitChannel",
  async (data, thunkAPI) => {
    const response = await axios.delete(`/channels/${data.channelId}`, {
      headers: headers,
    });
    return response.data;
  }
);
//게시글 저장
export const sendMessageChannel = createAsyncThunk(
  "channel/sendMessageChannel",
  async (data, thunkAPI) => {

    const chats = {
      chat: data.chat,
      img: data.img,
      channelId: parseInt(data.channelId),
      userId: data.userId,
    };
    const response = await axios.post(`/channels/${data.channelId}`, chats, {
      headers: headers,
    }); 
    return chats;
  }
);
//전체 사용자 조회
export const getchannelsUsers = createAsyncThunk(
  "channel/getchannelsUsers",
  async (data, thunkAPI) => {
    const response = await axios.get(`/channels/allUsers`, {headers: headers});

    return response.data.result
  }
);