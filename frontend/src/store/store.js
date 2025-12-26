import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import noticeReducer from "./slices/noticeSlice";
import messageReducer from "./slices/messageSlice";
import formReducer from "./slices/formSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notice: noticeReducer,
    message: messageReducer,
    form: formReducer,
  },
});

export default store;
