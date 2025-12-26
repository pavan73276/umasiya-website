import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    staff: null,
    isAuthenticated: null,
    error: null,
    message: null,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;

      if(action.payload.user.role === 'admin'){
        state.user = action.payload.user;
        state.isAuthenticated = 'admin';
      }
      if(action.payload.user.role === 'staff'){
        state.user = action.payload.user;
        state.isAuthenticated = 'staff';
      }
      
    },
    loginFailed(state, action) {
      state.loading = false;
      state.admin = {};
      state.staff = {};
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    fetchUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      if(action.payload.role === 'admin'){
        state.isAuthenticated = 'admin';
      }
      else if (action.payload.role === 'staff'){
        state.isAuthenticated = 'staff';
      }
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    logoutFailed(state, action) {
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    clearAllUserErrors(state) {
      state.error = null;
    }
  },
});

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login`, data, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.loginSuccess(response.data));
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Login failed";
    dispatch(userSlice.actions.loginFailed(message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  // Use Promise.allSettled to handle both requests
  const [staffResponse, adminResponse] = await Promise.allSettled([
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/staff/me`, { withCredentials: true }),
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/admin/me`, { withCredentials: true })
  ]);
  
  // Check for successful responses
  if (staffResponse.status === 'fulfilled') {
    dispatch(userSlice.actions.fetchUserSuccess(staffResponse.value.data.user));
  } else if (adminResponse.status === 'fulfilled') {
    dispatch(userSlice.actions.fetchUserSuccess(adminResponse.value.data.user));
  } else {
    // If both requests failed, handle errors
    const errorMessage = staffResponse.reason?.response?.data?.message || adminResponse.reason?.response?.data?.message || 'Failed to fetch user data';
    dispatch(userSlice.actions.fetchUserFailed(errorMessage));
  }

  // Clear any previous errors regardless of success or failure
  dispatch(userSlice.actions.clearAllUserErrors());
};

export const adminLogout = () => async (dispatch) => {
  
  try {
    await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/admin/logout`, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.logoutSuccess());
    toast.success('Logged Out Sucessfully')
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Logout failed";
    dispatch(userSlice.actions.logoutFailed(message));
  }
};

export const staffLogout = () => async (dispatch) => {
  
  try {
    await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/staff/logout`, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.logoutSuccess());
    toast.success('Logged Out Sucessfully')
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Logout failed";
    dispatch(userSlice.actions.logoutFailed(message));
  }
};

export const clearAllUserErrors = () => (dispatch) => {

  dispatch(userSlice.actions.clearAllUserErrors());
};

export default userSlice.reducer;
