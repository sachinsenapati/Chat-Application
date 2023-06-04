import  {configureStore}  from "@reduxjs/toolkit";
import  LoginSlice  from "./slice/loginSlice";
import  searchUserSlice  from "./slice/SearchUserSlice";
import ChatSlice from "./slice/ChatSlice";
import MessageSlice from "./slice/MessageSlice";

export const store = configureStore({
  reducer: {
    chat:ChatSlice,
    message:MessageSlice,
    user: LoginSlice,
    searchUser:searchUserSlice,
  },
});
