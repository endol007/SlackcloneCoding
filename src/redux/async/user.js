import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logIn = createAsyncThunk("user/logIn", async (data, thunkAPI) => {
  const response = await axios.post("/login", {
    email: data.email,
    password: data.password,
  });
  console.log("response", response);
  return response;
});
