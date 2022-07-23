import React from "react";
import { Router, Switch, Route, useRouteMatch } from "react-router-dom";
import history from "./history";
import { Preference, Homepage, BasicProfile, Skillset, Dashboard } from "./routes";
import { LoginModal, AppBar } from "./common/components";

export default function App() {
  return (
    <React.Fragment>
      <AppBar />
      <Router history={history}>
        <Switch>
          <Route exact path="/about">
            <h2>about</h2>
          </Route>
          <Route path="/onboarding">
            <Onboarding />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <React.Fragment>
              <LoginModal />
              <Homepage />
            </React.Fragment>
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
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
        <Route exact path="/">
          <h2>onboarding</h2>
        </Route>
      </Switch>
    </div>
  );
}
