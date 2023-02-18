import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@mui/material/styles";
import configureStore from "./store/store";
import App from "./App";
import "./index.css";
import { LoadingScreen } from "./common/components";
import { defaultTheme } from "./common/styles/theme";

const auth0Domain = process.env.AUTH0_DOMAIN as string;
const auth0ClientId = process.env.AUTH0_CLIENTID as string;
const auth0Audience = process.env.AUTH0_AUDIENCE as string;
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
        audience: auth0Audience,
      }}
    >
      <Provider store={store}>
        <PersistGate
          loading={<LoadingScreen isLoading />}
          persistor={persistor}
        >
          <ThemeProvider theme={defaultTheme}>
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  container
);
