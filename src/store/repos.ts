import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { Repository } from "../interfaces";

const initialState: Repository[] = [];

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    setRepos: (state: Repository[], action: PayloadAction<Repository[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setRepos } = reposSlice.actions;
export default reposSlice;
