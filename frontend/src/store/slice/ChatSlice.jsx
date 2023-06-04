import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const MyChatAPI = createAsyncThunk("getMyChats", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/api/chat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
});

export const createChatAPI = createAsyncThunk("createChat", async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  console.log(data);
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/api/chat`, {
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

export const createGroupChatAPI = createAsyncThunk(
  "createGroupChat",
  async (data) => {
    console.log(data);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/chat/group`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    error: null,
    selectedChat: null,
    user: null,
    notification: [],
    chats: [],
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(MyChatAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(MyChatAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(MyChatAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(createChatAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChatAPI.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
        state.chats.push(action.payload);
      })
      .addCase(createChatAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(createGroupChatAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroupChatAPI.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
        state.chats.push(action.payload);
      })
      .addCase(createGroupChatAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setSelectedChat, setUser, setNotification } = chatSlice.actions;

export const useChatState = () => {
  const dispatch = useDispatch();
  const chatState = useSelector((state) => state.chat);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    dispatch(setUser(userInfo));

    if (!userInfo) navigate("/auth");
  }, [dispatch, navigate]);

  return chatState;
};

export default chatSlice.reducer;
