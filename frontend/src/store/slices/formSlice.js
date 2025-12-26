// src/store/slices/formSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ================================
   Fetch Form by ID
================================ */
export const fetchAllForms = createAsyncThunk(
  "form/fetchAllForms",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/form/getall`
      );
      return data.forms;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch forms"
      );
    }
  }
);



export const fetchFormById = createAsyncThunk(
  "form/fetchFormById",
  async (formId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/form/${formId}`
      );
      return data.form;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch form"
      );
    }
  }
);

/* ================================
   Submit Form Response
================================ */
export const submitFormResponse = createAsyncThunk(
  "form/submitFormResponse",
  async ({ formId, responses }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/form/submit/${formId}`,
        { responses }
      );
      return data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to submit form"
      );
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState: {
    loading: false,
    form: null,
    forms: [], 
    successMessage: null,
    error: null,
  },
  reducers: {
    clearFormState: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Fetch Form */
      .addCase(fetchAllForms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllForms.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = action.payload;
      })
      .addCase(fetchAllForms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFormById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.form = null;
      })
      .addCase(fetchFormById.fulfilled, (state, action) => {
        state.loading = false;
        state.form = action.payload;
      })
      .addCase(fetchFormById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Submit Response */
      .addCase(submitFormResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitFormResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(submitFormResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFormState } = formSlice.actions;
export default formSlice.reducer;
