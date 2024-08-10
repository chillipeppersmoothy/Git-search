import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GitHubSearchResponse } from "../interfaces";
import { RootState } from "../store";
import { setRepos } from "../store/repos";
import "./styles.css";

const RepoList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.repos);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const gitRepos = async () => {
      const { data } = await axios.get<GitHubSearchResponse>(
        "https://api.github.com/search/repositories?q=XXX",
        { signal }
      );
      console.log("REPOS", data.items);
      dispatch(setRepos(data.items));
      return data;
    };
    gitRepos().catch((e) => console.error(e));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <div className="users-cont">
      {state.length ? (
        state.map((repo) => (
          <div className="user-card-cont" key={repo.id}>
            <img
              src={repo.owner.avatar_url}
              alt="userAvatar"
              className="user-avatar"
            />
            <span className="username">{repo.name}</span>

            <span className="repo-lang-span">Language: {repo.language}</span>
            <div>
              By:{" "}
              <Link
                to={`/users/user/${repo.owner.login}`}
                className="repo-owner"
              >
                {repo.owner.login}
              </Link>
            </div>

            <Link to={`/repo-detail/${repo.name}/${repo.owner.login}`}>
              <button>View Repo</button>
            </Link>
          </div>
        ))
      ) : (
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  );
};

export default RepoList;
