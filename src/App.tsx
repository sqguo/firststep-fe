import React from "react";
import { Router, Switch, Route, useRouteMatch } from "react-router-dom";
import history from './history';
import { Preference, Homepage } from "./routes";
import LoginModal from './common/components';

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/about">
          <h2>about</h2>
        </Route>
        <Route path="/onboarding">
          <Onboarding />
        </Route>
        <Route path="/dashboard">
          <h2>dashboard</h2>
        </Route>
        <Route path="/">
          <React.Fragment>
            <LoginModal />
            <Homepage />
          </React.Fragment>
        </Route>
      </Switch>
    </Router>
  );
}

function Onboarding() {
  let { path } = useRouteMatch();
  return (
    <div>
      <h2>Onboarding</h2>
      <Switch>
        <Route exact path={`${path}/preferences`}>
          <Preference preferences={[]} isLoading={false} />
        </Route>
        <Route exact path={`${path}/skillsets`}>
          <h2>skillsets</h2>
        </Route>
        <Route exact path="/">
          <h2>onboarding</h2>
        </Route>
      </Switch>
    </div>
  );
}
