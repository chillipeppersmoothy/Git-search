import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services";
import { setUser } from "../store/searchUser";
import "./styles.css";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState("Submit");
  const [attempts, setAttempts] = useState(3);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGetUser = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const response = await getUser(signal, username);

    if (response.status === 200) {
      dispatch(setUser(response.data));
      navigate(`/Git-search/users/user/${username}`);
    }

    controller.abort();
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
