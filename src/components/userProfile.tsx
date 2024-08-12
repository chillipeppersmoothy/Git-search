import { useSelector } from "react-redux";
import { RootState } from "../store";
import "./styles.css";

const UserProfile = () => {
  const state = useSelector((state: RootState) => state.searchUser);

  return (
    <div className="user-profile-main-cont">
      <div className="top-cont">
        <img
          src={state.avatar_url}
          className="user-avatar-img"
          alt="user-img"
        />{" "}
        <div className="name-cont">
          <span>{state.login}</span>
          <h2>{state.name}</h2>
          <h3>{state.location}</h3>
          <div className="follow-cont">
            <span className="followers">Followers: {state.followers}</span>
            <span>Following: {state.following}</span>
          </div>
          <a
            className="view-ongit-a"
            href={state.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>
      <div className="bottom-cont">
        <h3>{state.bio}</h3>
      </div>
    </div>
  );
};

export default UserProfile;
