import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,               // ✅ single source of truth
    isAuthenticated: false,   // ✅ boolean only
    error: null,
    message: null,
  },

  reducers: {
    /* ================= LOGIN ================= */
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.message = action.payload.message;
      state.error = null;
    },

    loginFailed(state, action) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    /* ================= GET USER ================= */
    fetchUserRequest(state) {
      state.loading = true;
    },

    fetchUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    fetchUserFailed(state, action) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    /* ================= LOGOUT ================= */
    logoutSuccess(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    logoutFailed(state, action) {
      state.error = action.payload;
    },

    /* ================= CLEAR ERRORS ================= */
    clearAllUserErrors(state) {
      state.error = null;
    },
  },
});

/* ================= ACTION EXPORTS ================= */
export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailed,
  logoutSuccess,
  logoutFailed,
  clearAllUserErrors,
} = userSlice.actions;

/* ================= THUNKS ================= */

/* 🔐 LOGIN */
export const login = (data) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/login`,
      data,
      { withCredentials: true }
    );

    dispatch(loginSuccess(response.data));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Login failed";
    dispatch(loginFailed(message));
  }
};

/* 👤 GET CURRENT USER (ADMIN OR STAFF) */
export const getUser = () => async (dispatch) => {
  dispatch(fetchUserRequest());

  try {
    // Try staff first, then admin
    const staffRes = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/user/staff/me`,
      { withCredentials: true }
    );

    dispatch(fetchUserSuccess(staffRes.data.user));
  } catch (staffErr) {
    try {
      const adminRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/admin/me`,
        { withCredentials: true }
      );

      dispatch(fetchUserSuccess(adminRes.data.user));
    } catch (adminErr) {
      const message =
        staffErr.response?.data?.message ||
        adminErr.response?.data?.message ||
        "Failed to fetch user";

      dispatch(fetchUserFailed(message));
    }
  }
};

/* 🚪 ADMIN LOGOUT */
export const adminLogout = () => async (dispatch) => {
  try {
    await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/user/admin/logout`,
      { withCredentials: true }
    );
    dispatch(logoutSuccess());
    toast.success("Logged out successfully");
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Logout failed";
    dispatch(logoutFailed(message));
  }
};

/* 🚪 STAFF LOGOUT */
export const staffLogout = () => async (dispatch) => {
  try {
    await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/user/staff/logout`,
      { withCredentials: true }
    );
    dispatch(logoutSuccess());
    toast.success("Logged out successfully");
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Logout failed";
    dispatch(logoutFailed(message));
  }
};

export default userSlice.reducer;
