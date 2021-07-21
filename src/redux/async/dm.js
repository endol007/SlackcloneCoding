import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};

export const getDmUsers = createAsyncThunk(
  // 채널 정보
  "channel/getDmUsers",
  async (data, thunkAPI) => {
    // const response = await axios.post(
    //   "/channels/users",
    //   { userId: data.userId },
    //   { headers }
    // );
    const response = await axios.get(`/channels/users`, {
      headers: headers,
    });
    console.log("getDmUsers", response.data.result);
    return response.data.result;
  }
);

export const createDM = createAsyncThunk(
  "channel/createDM",
  async (data, thunkAPI) => {
    const createdData = {
      userId: data.userId,
      otherUserId: data.otherUserId,
    };
    const response = await axios.post("/chats", createdData, { headers });
    console.log("createDM", response.data.result);
    return response.data.result;
  }
);

export const getAllDM = createAsyncThunk(
  // 채팅 내용
  "channel/getAllDM",
  async (data, thunkAPI) => {
    const response = await axios.post(
      `/chats/${data.dmsId}`,
      { userId: data.userId },
      { headers }
    );
    console.log("getAllDM", response.data.result);
    return response.data.result;
  }
);

export const sendDM = createAsyncThunk(
  "channel/sendDM",
  async (data, thunkAPI) => {
    const chatData = {
      userId: data.userId,
      chat: data.chat,
    };
    console.log("chatData", chatData);
    const response = await axios.post(`/chats/${data.dmsId}/chat`, chatData, {
      headers,
    });
    return response.data;
  }
);
