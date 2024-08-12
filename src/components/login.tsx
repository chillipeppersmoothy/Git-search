import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services";
import { authenticate, setAuthProfile, setCredentials } from "../store/auth";
import { RootState } from "../store";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const getUserData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const response = await getUser(signal, userName);

    controller.abort();
    dispatch(setAuthProfile(response.data));
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(setCredentials({ userName, password }));
    dispatch(authenticate());
    if (userName && password === "1234") {
      await getUserData();
    } else {
      setErrorMsg("Invalid Credentials");
    }
  };

  useEffect(() => {
    if (auth.isLogged) {
      navigate("/Git-search/authProfile");
    }
  }, [auth.isLogged, navigate]);

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <span className="error-span">{errorMsg}</span>
      <label htmlFor="username" className="login-label">
        Username
      </label>
      <input
        type="text"
        name="username"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
          setErrorMsg("");
        }}
        className="login-inp"
        placeholder="username"
      />
      <label htmlFor="password" className="login-label">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={password}
        className="login-inp"
        onChange={(e) => {
          setPassword(e.target.value);
          setErrorMsg("");
        }}
        placeholder="password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
