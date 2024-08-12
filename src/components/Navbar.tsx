import { Link } from "react-router-dom";
import "./styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Navbar = () => {
  const state = useSelector((state: RootState) => state.auth);
  return (
    <nav>
      <Link to={"/Git-search/"} className="logo-nav">
        Git Explorer
      </Link>
      <div className="link-cont">
        <Link to={"/Git-search/"}>Repos</Link>
        <Link to={"/Git-search/users"}>Users</Link>
        <Link to={"/Git-search/search"}>Search</Link>

        {!state.isLogged ? (
          <Link to={"/Git-search/login"}>Login</Link>
        ) : (
          <>
            <Link to={"/Git-search/authProfile"}>Profile</Link>
            <Link to={"/Git-search/logout"}>Logout</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
