import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchUserApi = createAsyncThunk("/api/search", async (query) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  console.log(query);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/user?search=${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const searchUserSlice = createSlice({
  name: "searchUser",
  initialState: {
    searchUser: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUserApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchUserApi.fulfilled, (state, action) => {
        state.loading = false;
        state.searchUser = action.payload;
      })
      .addCase(searchUserApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchUserSlice.reducer;
