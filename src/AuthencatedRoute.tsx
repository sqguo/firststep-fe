import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthencatedRoute = (props: any) => {
  const isLoggedIn = useSelector((state: AppState) => !!state.currentUser);
  const { children, ...rest } = props;
  return (
    <Route {...rest}>
      {isLoggedIn && children}
      {!isLoggedIn && <Redirect to={{ pathname: "/" }} />}
    </Route>
  );
};

export default AuthencatedRoute;
