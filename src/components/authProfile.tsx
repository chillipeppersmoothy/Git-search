/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { RootState } from "../store";

const AuthProfile = () => {
  const data = useSelector((state: RootState) => state.auth.authUserData);

  return (
    <div className="user-profile-main-cont">
      <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>YOUR PROFILE</h2>
      <div className="top-cont">
        <img src={data.avatar_url} className="user-avatar-img" alt="user-img" />{" "}
        <div className="name-cont">
          <span>{data.login}</span>
          <h2>{data.name}</h2>
          <div>
            <span style={{ display: "block" }}>
              Company:{" "}
              <span style={{ color: "purple", fontWeight: "700" }}>
                {data.company}
              </span>
            </span>
            <span>Public Repos: {data.public_repos}</span>
          </div>
          <h3>{data.location}</h3>
          <div className="follow-cont">
            <span className="followers">Followers: {data.followers}</span>
            <span>Following: {data.following}</span>
          </div>
          <a
            className="view-ongit-a"
            href={data.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>
      <div className="bottom-cont">
        <h3>{data.bio}</h3>
      </div>
    </div>
  );
};

export default AuthProfile;
