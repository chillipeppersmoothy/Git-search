import axios from "axios";
import {
  GitHubSearchResponse,
  GitHubUser,
  GitHubUsers,
  Repository,
} from "../interfaces";

export const getRepos = async (signal: AbortSignal) => {
  const response = await axios.get<GitHubSearchResponse>(
    "https://api.github.com/search/repositories?q=XXX",
    { signal }
  );
  return response;
};

export const getUsers = async (signal: AbortSignal) => {
  const response = await axios.get<GitHubUsers[]>(
    "https://api.github.com/users?since=XXXX",
    { signal }
  );
  return response;
};

export const getUser = async (signal: AbortSignal, userName: string) => {
  const response = await axios.get<GitHubUser>(
    `https://api.github.com/users/${userName}`,
    { signal }
  );
  return response;
};

export const getRepoUser = async (
  signal: AbortSignal,
  name: string,
  userName: string
) => {
  const response = await axios.get<Repository>(
    `https://api.github.com/repos/${userName}/${name}`,
    { signal }
  );
  return response;
};
