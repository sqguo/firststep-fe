import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";
import configureStore from "./store/store";
import App from "./App";
import "./index.css";
import { LoadingScreen } from "./common/components";

const auth0Domain = process.env.AUTH0_DOMAIN as string;
const auth0ClientId = process.env.AUTH0_CLIENTID as string;
const container = document.getElementById("root")!;
const [store, persistor] = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      cacheLocation="localstorage"
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <PersistGate
          loading={<LoadingScreen isLoading />}
          persistor={persistor}
        >
          <App />
        </PersistGate>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  container
);
