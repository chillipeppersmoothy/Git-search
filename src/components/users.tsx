import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GitHubUsers } from "../interfaces";
import { RootState } from "../store";
import { setUsers } from "../store/users";

const Users = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getGitUsers = async () => {
      const { data } = await axios.get<GitHubUsers[]>(
        "https://api.github.com/users?since=XXXX",
        { signal }
      );
      console.log("USERS", data);
      dispatch(setUsers(data));
      return data;
    };
    getGitUsers().catch((e) => console.error(e));

    return () => {
      controller.abort();
    };
  }, [dispatch]);
  return (
    <div style={{ marginTop: "50px" }}>
      {" "}
      <div className="users-cont">
        {state.map((user) => (
          <div className="user-card-cont" key={user.id}>
            <img
              src={user.avatar_url}
              alt="userAvatar"
              className="user-avatar"
            />
            <span className="username">{user.login}</span>
            <button
              onClick={() => navigate(`/users/user/${user.login}`)}
              className="view-btn"
            >
              View User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
