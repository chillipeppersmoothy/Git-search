import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { Repository } from "../interfaces";

const initialState: { data: Repository[]; fetchDone: boolean } = {
  data: [],
  fetchDone: false,
};

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    setRepos: (state, action: PayloadAction<Repository[]>) => {
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

export const { setRepos, markFetchDone } = reposSlice.actions;
export default reposSlice;
