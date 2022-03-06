import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    ).then((res) => res.json());

    return response
  }
 
);

const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: null,
  },

  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.status = "Loading";
    },

    [getUsers.fulfilled]: (state, action) => {
      state.action = "Success";
      state.users = action.payload;
    },

    [getUsers.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default usersSlice.reducer;
