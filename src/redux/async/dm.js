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
  "channel/getAllDM",
  async (data, thunkAPI) => {
    const response = await axios.get(`/chats/${data.dmId}`);
    return response.data.result;
  }
);

export const sendDM = createAsyncThunk(
    "channel/sendDM",
    async (data, thunkAPI) => {
        const chats = {
            userId: data.userId,
            chat: data.message
        }
        //const response = await axios.post(`/chats/1`, chats);  ///chats/${dmsId}
        return chats;
    }
)