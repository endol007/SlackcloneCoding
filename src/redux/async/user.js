import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {
    const newUser = {
      id: data.email,
      password: data.password,
      nickname: data.nickname,
    };
    const response = await axios.post("/users/createAccount", newUser);
    console.log("response", response.data);
    return newUser;
  }
);

export const logIn = createAsyncThunk("user/logIn", async (data, thunkAPI) => {
  const response = await axios.post("/users/login", {
    id: data.email,
    password: data.password,
  });
  console.log("response", response.data);
  return response.data;
});

export const getUser = createAsyncThunk(
  "user/getUser",
  async (data, thunkAPI) => {
    const response = await axios.get("/users/me");
    console.log("response", response.data);
    return response.data;
  }
);

export const dupCheckUser = createAsyncThunk(
  "user/dupCheckUser",
  async (data, thunkAPI) => {
    const response = await axios.post("/users/dupCheck", { id: data.id });
    console.log("response", response.data);
    return response.data;
  }
);