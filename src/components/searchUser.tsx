import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useDispatch } from "react-redux";
import { setSearchUser } from "../store/searchUser";
import { GitHubUser } from "../interfaces";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState("Submit");
  const [attempts, setAttempts] = useState(3);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGetUser = async () => {
    const response = await axios.get<GitHubUser>(
      `https://api.github.com/users/${username}`
    );
    if (response.status === 200) {
      dispatch(setSearchUser(response.data));
      navigate(`/users/user/${username}`);
    }
    return response;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading("Loading...");
    if (username) {
      handleGetUser().catch(() => {
        setLoading("Submit");
        setAttempts((currentAttempt) => currentAttempt - 1);
        setErrorMsg(`User Does Not Exist! ${attempts - 1} Attempts remaining`);
      });
    }
  };
  useEffect(() => {
    if (attempts <= 0) {
      setErrorMsg("Too many attempts, REDIRECTING...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [attempts, navigate]);
  return (
    <>
      <h3>Search User</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        {errorMsg && (
          <span style={{ fontSize: "12px", color: "orangered" }}>
            {" "}
            {errorMsg}
          </span>
        )}
        <input
          type="text"
          placeholder="Github username"
          className="login-inp"
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMsg("");
          }}
          value={username ? username : ""}
        />
        <button type="submit" className="login-submit-btn">
          {loading}
        </button>
      </form>
    </>
  );
};

export default SearchUser;
