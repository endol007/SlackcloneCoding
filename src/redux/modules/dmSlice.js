import { createSlice } from "@reduxjs/toolkit";

initialState = {
    message: "",
    userId: "",
}

const dmSlice = createSlice({
    name: "sendChat",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
    builder.addCase(sendChat.pending, (state,action) => {

    })

})

