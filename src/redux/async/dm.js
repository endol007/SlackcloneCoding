import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};

export const getDmUsers = createAsyncThunk(
  "channel/getDmUsers",
  async (data, thunkAPI) => {
    const response = await axios.post(
      "/channels/users",
      { userId: data.userId },
      { headers }
    );
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
    console.log("response", response.data.result);
    return response.data.result;
  }
);

export const getAllDM = createAsyncThunk(
  "channel/getAllDM",
  async (data, thunkAPI) => {
    const response = await axios.get(
      `/chats/${data.dmsId}`,
      { headers }
    );
    // console.log(response.data.result);
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
    const response = await axios.post(`/chats/${data.dmsId}`, chatData, {
      headers,
    });
    return response.data;
  }
);
