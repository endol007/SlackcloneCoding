import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const sendChat = createAsyncThunk("/user/sendChat", async (data, thunkAPI) => {
    const response = {
        data: data.message,
        userId: data.userId
    }
    console.log(response);
  return;
});

export const receiveChat = createAsyncThunk("/user/receiveChat", async (data, thunkAPI) => {
    return receiveChat;
})
