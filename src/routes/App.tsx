import { Suspense } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Navbar from "../components/Navbar";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { appRoutes } from "./route";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function App() {
  const state = useSelector((state: RootState) => state.auth);
  return (
    <>
      <Navbar />
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={300}
          unmountOnExit
        >
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes location={location}>
              {appRoutes.map((route) => {
                if (route.requiresAuth && !state.isLogged) {
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<Navigate replace to={"/Git-search/login"} />}
                    />
                  );
                } else {
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.component />}
                    />
                  );
                }
              })}
            </Routes>
          </Suspense>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

export default App;
