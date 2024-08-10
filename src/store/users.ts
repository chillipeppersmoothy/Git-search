import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GitHubUsers } from "../interfaces";

const initialState: GitHubUsers[] = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<GitHubUsers[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice;
