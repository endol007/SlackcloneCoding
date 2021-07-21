import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
};

export const signUp = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {
    const newUser = {
      email: data.email,
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
    email: data.email,
    password: data.password,
  });
  console.log("response", response.data);
  return response.data;
});

export const getUser = createAsyncThunk(
  "user/getUser",
  async (data, thunkAPI) => {
    const response = await axios.get("/users/me", { headers });
    return response.data;
  }
);

export const dupCheckUser = createAsyncThunk(
  "user/dupCheckUser",
  async (data, thunkAPI) => {
    const response = await axios.post("/users/dupCheck", { email: data });
    console.log("response", response.data);
      if(response.data.ok === true){
        window.alert("사용가능한 아이디입니다.")
      return response.data;
      }else{
        window.alert("이미 가입된 아이디입니다")
        return response.data;
      }
    
  }
);
