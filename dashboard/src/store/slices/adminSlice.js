import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    staffs: [],       // ✅ array
    error: null,
    message: null,
  },

  reducers: {
    adminRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    addNewAdminSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },

    addNewStaffSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },

    getAllStaffSuccess(state, action) {
      state.loading = false;
      state.staffs = action.payload.staffs;
    },

    adminFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearAdminState(state) {
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  adminRequest,
  addNewAdminSuccess,
  addNewStaffSuccess,
  getAllStaffSuccess,
  adminFailure,
  clearAdminState,
} = adminSlice.actions;

/* =======================
   ADD NEW ADMIN
======================= */
export const addNewAdmin = (data) => async (dispatch) => {
  try {
    dispatch(adminRequest());

    const { data: res } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/admin/addnew`,
      data,
      { withCredentials: true }
    );

    dispatch(addNewAdminSuccess(res));
    toast.success("New Admin Added");
  } catch (error) {
    dispatch(
      adminFailure(
        error.response?.data?.message || "Failed to add admin"
      )
    );
  }
};

/* =======================
   ADD NEW STAFF
======================= */
export const addNewStaff = (data) => async (dispatch) => {
  try {
    dispatch(adminRequest());

    const { data: res } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/staff/addnew`,
      data,
      { withCredentials: true }
    );

    dispatch(addNewStaffSuccess(res));
    toast.success("New Staff Added");
  } catch (error) {
    dispatch(
      adminFailure(
        error.response?.data?.message || "Failed to add staff"
      )
    );
  }
};

/* =======================
   GET ALL STAFF
======================= */
export const getAllStaff = () => async (dispatch) => {
  try {
    dispatch(adminRequest());

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/user/staff`,
      { withCredentials: true }
    );

    dispatch(getAllStaffSuccess(data));
  } catch (error) {
    dispatch(
      adminFailure(
        error.response?.data?.message || "Failed to fetch staff"
      )
    );
  }
};

/* =======================
   CLEAR ERRORS / MESSAGES
======================= */
export const clearAdminErrors = () => (dispatch) => {
  dispatch(clearAdminState());
};

export default adminSlice.reducer;
