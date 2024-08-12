import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, GitHubUser } from "../interfaces";

const authUserData: GitHubUser = {
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

// Define the initial state
const initialState: AuthState = {
  userName: "",
  password: "",
  isLogged: false,
  authUserData,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        userName: string;
        password: string;
      }>
    ) => {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
    },
    authenticate: (state) => {
      if (state.userName && state.password === "1234") {
        state.isLogged = true;
      } else {
        state.isLogged = false;
      }
    },
    logout: (state) => {
      state.userName = "";
      state.password = "";
      state.isLogged = false;
      state.authUserData = {} as GitHubUser;
    },
    setAuthProfile: (state, action: PayloadAction<GitHubUser>) => {
      state.authUserData = action.payload;
      return state;
    },
  },
});

// Export the actions and reducer
export const { setCredentials, authenticate, logout, setAuthProfile } =
  authSlice.actions;
export default authSlice;
