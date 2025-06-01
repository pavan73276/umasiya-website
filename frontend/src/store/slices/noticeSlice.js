// src/store/slices/noticeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchNotices = createAsyncThunk("notice/fetchNotices", async () => {
  const { data } = await axios.get(`http://localhost:4000/notice/all`);
  return data.notices;
});

const noticeSlice = createSlice({
  name: "notice",
  initialState: {
    notices: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.notices = action.payload;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default noticeSlice.reducer;
