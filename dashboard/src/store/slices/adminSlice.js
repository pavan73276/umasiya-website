import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    admin: {},
    staffs: {},
    error: null,
    message: null,
  },
  reducers: {
    adminRequest(state, action) {
      state.loading = true;
    },
    addNewAdminRequest(state, action) {
      state.loading = true;
    },
    addNewAdminSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    addNewAdminFailed(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    addNewStaffRequest(state, action) {
      state.loading = true;
    },
    addNewStaffSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    addNewStaffFailed(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    getAllStaffSuccess(state, action) {
      state.loading = false;
      state.staffs = action.payload.staffs;
    },
    
    adminFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAdminErrors(state) {
      state.error = null;
    }
  },
});

export const addNewAdmin = (data) => async (dispatch) => {
  dispatch(adminSlice.actions.addNewAdminRequest());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/admin/addnew`, data, {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.addNewAdminSuccess(response.data));
    toast.success('New Admin Added');
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to add admin";
    dispatch(adminSlice.actions.addNewAdminFailed(message));
  }
};

export const addNewStaff = (data) => async (dispatch) => {
  dispatch(adminSlice.actions.addNewStaffRequest());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/staff/addnew`, data, {
      withCredentials: true,
    });
    dispatch(adminSlice.actions.addNewStaffSuccess(response.data));
    toast.success('New Staff Added');
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to add staff";
    dispatch(adminSlice.actions.addNewStaffFailed(message));
  }
};



export const getAllStaff = () => async (dispatch) => {
  dispatch(adminSlice.actions.adminRequest());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/staff`, {
      withCredentials: true,
    });
    
    dispatch(adminSlice.actions.getAllStaffSuccess(response.data));
  } catch (error) {
    const message = error.response?.data?.message || error.message || "An error occurred";
    dispatch(adminSlice.actions.adminFailed(message));
  }
};


export const clearAllUserErrors = () => (dispatch) => {
  dispatch(adminSlice.actions.clearAllUserErrors());
};

export default adminSlice.reducer;
