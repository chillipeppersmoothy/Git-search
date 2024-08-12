import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRepos } from "../services";
import { RootState } from "../store";
import { markFetchDone, setRepos } from "../store/repos";
import "./styles.css";

const RepoList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.repos);

  useEffect(() => {
    if (state.fetchDone) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    const gitRepos = async () => {
      const { data } = await getRepos(signal);
      dispatch(setRepos(data.items));
      dispatch(markFetchDone());
      return data;
    };
    gitRepos().catch((e) => console.error(e));

    return () => {
      controller.abort();
    };
  }, [dispatch, state.fetchDone]);

  return (
    <div className="users-cont">
      {state.data.length ? (
        state.data.map((repo) => (
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

            <Link
              to={`/Git-search/repo-detail/${repo.name}/${repo.owner.login}`}
            >
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
