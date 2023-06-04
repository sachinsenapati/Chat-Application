import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  useSelector } from "react-redux";



export const MessageAPI = createAsyncThunk("myMessages", async (chatId) => {
    console.log(chatId)
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/message/${chatId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
});

export const createMessageAPI = createAsyncThunk("createMessage", async (data) => {
  console.log(data);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
});

const MessageSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    error: null,
    messages: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(MessageAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(MessageAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(MessageAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(createMessageAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMessageAPI.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
        state.messages.push(action.payload);
      })
      .addCase(createMessageAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const useMessageState = () => {
  const messageState = useSelector((state) => state.message);
  return messageState;
};

export default MessageSlice.reducer;
