import { configureStore } from "@reduxjs/toolkit";
import noticeReducer from "./slices/noticeSlice";
import messageReducer from "./slices/messageSlice";

const store = configureStore({
  reducer: {
    notice: noticeReducer,
    message: messageReducer
  },
});

export default store;
