import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginApi = createAsyncThunk("login/loginApi", async (data) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    localStorage.setItem("user", JSON.stringify(result));
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    token:'',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
