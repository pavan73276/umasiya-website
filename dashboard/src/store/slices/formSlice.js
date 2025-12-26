import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const formSlice = createSlice({
  name: "form",
  initialState: {
    loading: false,
    forms: [],
    form: null,          // single form
    responses: [],       // form responses
    error: null,
    submitSuccess: false,
  },

  reducers: {
    formRequest(state) {
      state.loading = true;
      state.error = null;
      state.submitSuccess = false;
    },

    getFormsSuccess(state, action) {
      state.loading = false;
      state.forms = action.payload;
    },

    getSingleFormSuccess(state, action) {
      state.loading = false;
      state.form = action.payload;
    },

    submitFormSuccess(state) {
      state.loading = false;
      state.submitSuccess = true;
    },

    getFormResponsesSuccess(state, action) {
      state.loading = false;
      state.responses = action.payload;
    },

    formFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearFormState(state) {
      state.loading = false;
      state.error = null;
      state.submitSuccess = false;
      state.form = null;
      state.responses = [];
    },
  },
});

export const {
  formRequest,
  getFormsSuccess,
  getSingleFormSuccess,
  submitFormSuccess,
  getFormResponsesSuccess,
  formFailure,
  clearFormState,
} = formSlice.actions;

/* =======================
   ADMIN — CREATE FORM
======================= */
export const createForm = (formData) => async (dispatch) => {
  try {
    dispatch(formRequest());

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/form/create`,
      formData,
      { withCredentials: true }
    );

    toast.success(data.message || "Form created successfully");

    // OPTIONAL: refresh forms list for admin
    dispatch(fetchAllForms());
  } catch (error) {
    dispatch(
      formFailure(
        error.response?.data?.message || "Failed to create form"
      )
    );
  }
};

/* =======================
   PUBLIC / ADMIN — GET ALL FORMS
======================= */
export const fetchAllForms = () => async (dispatch) => {
  try {
    dispatch(formRequest());

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/form/getall`
    );

    dispatch(getFormsSuccess(data.forms));
  } catch (error) {
    dispatch(
      formFailure(
        error.response?.data?.message || "Failed to fetch forms"
      )
    );
  }
};

/* =======================
   PUBLIC / ADMIN — GET FORM BY ID
======================= */
export const fetchFormById = (id) => async (dispatch) => {
  try {
    dispatch(formRequest());

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/form/${id}`
    );

    dispatch(getSingleFormSuccess(data.form));
  } catch (error) {
    dispatch(
      formFailure(
        error.response?.data?.message || "Failed to fetch form"
      )
    );
  }
};

/* =======================
   ADMIN — GET FORM RESPONSES
======================= */
export const fetchFormResponses = (formId) => async (dispatch) => {
  try {
    dispatch(formRequest());

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/form/responses/${formId}`,
      { withCredentials: true }
    );

    dispatch(getFormResponsesSuccess(data.responses));
  } catch (error) {
    dispatch(
      formFailure(
        error.response?.data?.message || "Failed to fetch responses"
      )
    );
  }
};
export const submitFormResponse =
  ({ formId, responses }) =>
  async (dispatch) => {
    try {
      dispatch(formRequest());

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/form/${formId}/submit`,
        { responses },
        { withCredentials: true }
      );

      dispatch(submitFormSuccess());
      toast.success(data.message || "Form submitted successfully");
    } catch (error) {
      dispatch(
        formFailure(
          error.response?.data?.message || "Failed to submit form"
        )
      );
    }
  };

export default formSlice.reducer;
