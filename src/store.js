import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./stores/UserSlice"

export default configureStore({
  reducer: {
    user: userReducer
  }
})