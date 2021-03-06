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
    return response.data.result;
  }
);

// 채팅 기록
export const getDMChat = createAsyncThunk(
  "channel/getDMChat",
  async (data, thunkAPI) => {
    const response = await axios.post(`/chats/${data.dmsId}`, {userId: data.userId},{
      headers,
    });
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
    const response = await axios.post(`/chats/${data.dmsId}/chat`, chatData, {
      headers,
    });
    return response.data;
  }
);
//채팅 실시간 리듀서 반영
export const addDMChat = createAsyncThunk(
  "channel/addDMChat",
  async (data, thunkAPI) => {
    return data;
  }
);
