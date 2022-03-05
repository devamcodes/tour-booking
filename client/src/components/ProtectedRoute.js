import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        render={(props) => {
          if (auth) return <Component {...props} />;
          if (!auth) {
            return (
              <>
                {/* <h2>You are not Logged</h2> */}
                <Navigate
                  to="/sign-in"
                  //   to={{ path: "/signin", state: { from: props.location } }}
                />
              </>
            );
          }
        }}
      />
    </Routes>
  );
};

export default ProtectedRoute;
