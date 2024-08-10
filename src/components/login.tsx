import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { authenticate, setCredentials } from "../store/auth";

const Login = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(setCredentials({ userName, password }));
    dispatch(authenticate());
    setTimeout(() => {
      return;
    }, 2000);
    authState.isLogged
      ? navigate("/Git-search/authProfile")
      : setErrorMsg("Invalid Credentials");
  };
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
