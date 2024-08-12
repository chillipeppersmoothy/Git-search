import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GitHubUsers } from "../interfaces";
import { getUser, getUsers } from "../services";
import { RootState } from "../store";
import { setUser } from "../store/searchUser";
import { markFetchDone, setUsers } from "../store/users";

const Users = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();

  const handleClick = async (user: GitHubUsers) => {
    const controller = new AbortController();
    const signal = controller.signal;

    const response = await getUser(signal, user.login);

    if (response.status === 200) {
      dispatch(setUser(response.data));
      navigate(`/Git-search/users/user/${user.login}`);
    } else {
      console.error("Error fetching user");
    }

    controller.abort();
    return response;
  };

  useEffect(() => {
    if (state.fetchDone) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const getGitUsers = async () => {
      const { data } = await getUsers(signal);
      dispatch(setUsers(data));
      dispatch(markFetchDone());
      return data;
    };
    getGitUsers().catch((e) => console.error(e));

    return () => {
      controller.abort();
    };
  }, [dispatch, state.fetchDone]);
  return (
    <div style={{ marginTop: "50px" }}>
      {" "}
      <div className="users-cont">
        {state.data.map((user) => (
          <div className="user-card-cont" key={user.id}>
            <img
              src={user.avatar_url}
              alt="userAvatar"
              className="user-avatar"
            />
            <span className="username">{user.login}</span>
            <button onClick={() => handleClick(user)} className="view-btn">
              View User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
