import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registrationApi = createAsyncThunk(
  "registration/registrationApi",
  async (data) => {
    console.log(data)
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log("Error in the reg slice");
      throw error;
    }
  }
);

export const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registrationApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(registrationApi.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registrationApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default registrationSlice.reducer;
