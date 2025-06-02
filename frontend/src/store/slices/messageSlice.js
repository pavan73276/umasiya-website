// src/store/slices/messageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMessage = createAsyncThunk("message/sendMessage", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`https://umasiya-website-1.onrender.com/message/send`, formData);
    return data.message;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to send message");
  }
});

const messageSlice = createSlice({
  name: "message",
  initialState: {
    loading: false,
    successMessage: null,
    error: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
