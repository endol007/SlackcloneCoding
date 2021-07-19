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

export const getOneDM = createAsyncThunk(
  "channel/getOneDM",
  async (data, thunkAPI) => {
    const response = await axios.get(`/chats/${data.dmId}`);
    console.log("response", response.data.result);
    return response.data.result;
  }
);
