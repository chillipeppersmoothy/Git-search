import { createSlice } from "@reduxjs/toolkit";
import { GitHubUser } from "../interfaces";

const initialState: GitHubUser = {
  login: "",
  id: 0,
  node_id: "",
  avatar_url: "",
  gravatar_id: "",
  url: "",
  html_url: "",
  followers_url: "",
  following_url: "",
  gists_url: "",
  starred_url: "",
  subscriptions_url: "",
  organizations_url: "",
  repos_url: "",
  events_url: "",
  received_events_url: "",
  type: "",
  site_admin: false,
  name: "",
  company: "",
  blog: "",
  location: "",
  email: null,
  hireable: null,
  bio: null,
  twitter_username: null,
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: "",
  updated_at: "",
};

const searchUserSlice = createSlice({
  name: "searchUser",
  initialState,
  reducers: {
    setSearchUser: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setSearchUser } = searchUserSlice.actions;
export default searchUserSlice;
