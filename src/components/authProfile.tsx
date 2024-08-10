/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { GitHubUser } from "../interfaces";
import { setAuthProfile } from "../store/auth";

const AuthProfile = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getGitUser = async () => {
      const { data } = await axios.get<GitHubUser>(
        `https://api.github.com/users/${auth.userName}`,
        { signal }
      );
      console.log("USER IS HERE", data);
      dispatch(setAuthProfile(data));
      return data;
    };
    getGitUser().catch((e) => console.error(e));

    return () => {
      controller.abort();
    };
  }, [auth.userName]);

  return (
    <div className="user-profile-main-cont">
      <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>YOUR PROFILE</h2>
      <div className="top-cont">
        <img
          src={auth.authUserData.avatar_url}
          className="user-avatar-img"
          alt="user-img"
        />{" "}
        <div className="name-cont">
          <span>{auth.authUserData.login}</span>
          <h2>{auth.authUserData.name}</h2>
          <div>
            <span style={{ display: "block" }}>
              Company:{" "}
              <span style={{ color: "purple", fontWeight: "700" }}>
                {auth.authUserData.company}
              </span>
            </span>
            <span>Public Repos: {auth.authUserData.public_repos}</span>
          </div>
          <h3>{auth.authUserData.location}</h3>
          <div className="follow-cont">
            <span className="followers">
              Followers: {auth.authUserData.followers}
            </span>
            <span>Following: {auth.authUserData.following}</span>
          </div>
          <a
            className="view-ongit-a"
            href={auth.authUserData.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>
      <div className="bottom-cont">
        <h3>{auth.authUserData.bio}</h3>
      </div>
    </div>
  );
};

export default AuthProfile;
