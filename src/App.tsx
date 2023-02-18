import React from "react";
import { Router, Switch, Route, useRouteMatch } from "react-router-dom";
import history from "./history";
import { Preference, Homepage, BasicProfile, Skillset, Dashboard, About, WaitingPage } from "./routes";
import { LoginModal, AppBar } from "./common/components";
import useAuthencatedUser from "./common/hooks/useAuthencatedUser";
import AuthencatedRoute from "./AuthencatedRoute";
import "./App.scss"; 
import AutoRedirectRoute from "./AutoRedirectRoute";

export default function App() {
  useAuthencatedUser();
  return (
      <Router history={history}>
        <LoginModal />
        <AppBar />
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <AuthencatedRoute path="/onboarding">
            <Onboarding />
          </AuthencatedRoute>
          <AuthencatedRoute path="/dashboard">
            <Dashboard />
          </AuthencatedRoute>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
  );
}

function Onboarding() {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={`${path}/preferences`}>
          <Preference />
        </Route>
        <Route exact path={`${path}/skillsets`}>
          <Skillset />
        </Route>
        <Route exact path={`${path}/profile`}>
          <BasicProfile />
        </Route>
        <AutoRedirectRoute exact path={`${path}/`} />
      </Switch>
    </div>
  );
}
