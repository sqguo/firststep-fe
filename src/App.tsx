import React from "react";
import { BrowserRouter, Switch, Route, useRouteMatch } from "react-router-dom";
import "./App.css";
import Preference from "./routes/onboarding/preference";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/about">
          <h2>about</h2>
        </Route>
        <Route path="/onboarding">
          <Onboarding />
        </Route>
        <Route path="/dashboard">
          <h2>dashboard</h2>
        </Route>
        <Route path="/">
          <h2>Home</h2>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function Onboarding() {
  let { path } = useRouteMatch();
  return (
    <div>
      <h2>Onboarding</h2>
      <Switch>
        <Route path={`${path}/preferences`}>
          <Preference preferences={[]} isLoading={false} />
        </Route>
        <Route path={`${path}/skillsets`}>
          <h2>skillsets</h2>
        </Route>
        <Route path={`${path}/projects`}>
          <h2>projects</h2>
        </Route>
        <Route path="/">
          <h2>onboarding</h2>
        </Route>
      </Switch>
    </div>
  );
}
