import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    loading: false,
    
    error: null,
    message: null,
  },
  reducers: {
    staffRequest(state, action) {
      state.loading = true;
    },
 
    staffLogoutSuccess(state) {
      state.loading = false;
      state.staff = {};
      state.isStaffAuthenticated = false;
    },
    staffFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearStaffErrors(state) {
      state.error = null;
    }
  },
});


export const staffLogout = () => async (dispatch) => {
  dispatch(staffSlice.actions.staffRequest());
};

export const clearAllStaffErrors = () => (dispatch) => {
  dispatch(staffSlice.actions.clearStaffErrors());
};

export default staffSlice.reducer;
