/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

import Home from "../components/home";
const Users = lazy(() => import("../components/users"));
const UserProfile = lazy(() => import("../components/userProfile"));
const SearchUser = lazy(() => import("../components/searchUser"));
const Login = lazy(() => import("../components/login"));
const AuthProfile = lazy(() => import("../components/authProfile"));
const AboutUs = lazy(() => import("../components/about"));
const RepoDetail = lazy(() => import("../components/repoDetails"));
const NotFound = lazy(() => import("../components/NotFound"));

export const appRoutes = [
  {
    path: "/Git-search/",
    component: Home,
    requiresAuth: false,
  },
  {
    path: "/Git-search/login",
    component: Login,
    requiresAuth: false,
  },
  {
    path: "/Git-search/users",
    component: Users,
    requiresAuth: false,
  },
  {
    path: "/Git-search/authProfile",
    component: AuthProfile,
    requiresAuth: true,
  },
  {
    path: "/Git-search/search",
    component: SearchUser,
    requiresAuth: false,
  },
  {
    path: "/Git-search/users/user/:username",
    component: UserProfile,
    requiresAuth: false,
  },
  {
    path: "/Git-search/about",
    component: AboutUs,
    requiresAuth: false,
  },
  {
    path: "/Git-search/repo-detail/:name/:username",
    component: RepoDetail,
    requiresAuth: false,
  },
  {
    path: "*",
    component: NotFound,
    requiresAuth: false,
  },
];
