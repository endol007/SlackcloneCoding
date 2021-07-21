import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};

// 유저 정보
export const getUser = createAsyncThunk(
  "user/getUser",
  async (data, thunkAPI) => {
    const response = await axios.get("/users/me", { headers });
    console.log("유저 정보", response.data);
    return response.data;
  }
);

// 이메일 중복 체크
export const dupCheckUser = createAsyncThunk(
  "user/dupCheckUser",
  async (data, thunkAPI) => {
    const response = await axios.post("/users/dupCheck", { email: data });
    console.log("response", response.data.ok);
    return response.data.ok;
  }
);

// 회원 가입
export const signUp = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {
    const newUser = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    };
    const response = await axios.post("/users/createAccount", newUser);
    console.log("회원 가입", response.data);
    return newUser;
  }
);

// 로그인
export const logIn = createAsyncThunk("user/logIn", async (data, thunkAPI) => {
  const response = await axios.post("/users/login", {
    email: data.email,
    password: data.password,
  });
  console.log("로그인", response.data.result);
  return response.data.result;
});
