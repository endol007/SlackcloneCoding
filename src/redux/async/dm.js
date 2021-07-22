import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};

// DM 목록
export const getDMList = createAsyncThunk(
  "channel/getDMList",
  async (data, thunkAPI) => {
    const response = await axios.post(
      "/channels/users",
      { userId: data.userId },
      { headers }
    );
    console.log("DM 목록", response.data.result);
    return response.data.result;
  }
);

// DM 목록 생성
export const createDM = createAsyncThunk(
  "channel/createDM",
  async (data, thunkAPI) => {
    const createdData = {
      userId: data.userId,
      otherUserId: data.otherUserId,
    };
    const response = await axios.post("/chats", createdData, { headers });
    console.log("DM 목록 생성", response.data);
    return response.data.result;
  }
);

// 채팅 기록
export const getDMChat = createAsyncThunk(
  "channel/getDMChat",
  async (data, thunkAPI) => {
    // const response = await axios.get(`/chats/${data.dmsId}`, {
    //   headers: headers,
    // });
    const response = await axios.post(`/chats/${data.dmsId}`, {
      headers,
      userId: data.userId,
    });
    console.log("채팅 기록", response.data.result);
    return response.data.result;
  }
);

// 채팅 전송
export const sendDM = createAsyncThunk(
  "channel/sendDM",
  async (data, thunkAPI) => {
    const chatData = {
      userId: data.userId,
      chat: data.chat,
    };
    console.log("채팅 전송", chatData);
    const response = await axios.post(`/chats/${data.dmsId}/chat`, chatData, {
      headers,
    });
    return response.data;
  }
);
