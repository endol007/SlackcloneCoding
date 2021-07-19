import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDmUsers = createAsyncThunk(
  "channel/getDmUsers",
  async (data, thunkAPI) => {
    const response = await axios.get("/channels/users");
    console.log("response", response.data.result);
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
    const response = await axios.post("/chats", createdData);
    console.log("response", response.data.result);
    return response.data.result;
  }
);

export const getAllDM = createAsyncThunk(
  "channel/getOneDM",
  async (data, thunkAPI) => {
    const response = await axios.get(`/chats/${data.dmId}`);
    return response.data.result;
  }
);

export const sendDM = createAsyncThunk(
    "channel/sendDM",
    async (data, thunkAPI) => {
        const chatData = {
            nickname: data.nickname,
            message: data.chat
        }
        // const response = await axios.post("/chats", chatData);
        return chatData;
    }
)