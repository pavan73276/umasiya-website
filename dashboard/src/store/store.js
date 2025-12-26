import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "./slices/staffSlice";
import adminReducer from "./slices/adminSlice";
import userReducer from "./slices/userSlice";
import formReducer from "./slices/formSlice";

const store = configureStore({
  reducer: {
      staff: staffReducer,
      admin: adminReducer,
      user: userReducer,
      form: formReducer,
  },
});

export default store;