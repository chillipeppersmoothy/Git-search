import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import reposReducer from "./repos";
import usersReducer from "./users";
import searchUserReducer from "./searchUser";

const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    repos: reposReducer.reducer,
    users: usersReducer.reducer,
    searchUser: searchUserReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
