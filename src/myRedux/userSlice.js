import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  ).then((res) => res.json());

  return response;
});

const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: null,
  },

  reducers: {
    deleteRow: (state, action) => {
      console.log("action", action.payload.id);

    state.users =   state.users.filter((data) => {
        return data.id !== action.payload.id;
      });
    },
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

export const { deleteRow } = usersSlice.actions;

export default usersSlice.reducer;
