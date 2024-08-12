import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GitHubUsers } from "../interfaces";

const initialState: { data: GitHubUsers[]; fetchDone: boolean } = {
  data: [],
  fetchDone: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<GitHubUsers[]>) => {
      state.data = action.payload;
      return state;
    },
    markFetchDone: (state) => {
      if (state.data.length) {
        state.fetchDone = true;
        return;
      }
    },
  },
});

export const { setUsers, markFetchDone } = usersSlice.actions;
export default usersSlice;
