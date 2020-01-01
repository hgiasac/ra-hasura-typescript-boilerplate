import hasuraDataProvider from "ra-data-hasura";
import React from "react";
import { Admin } from "react-admin";
import { customRoutes, pageResources } from "./pages";
import { authProvider, httpClient } from "./shared/AuthProvder";
import Login from "./shared/components/Auth/Login";
import { Layout } from "./shared/components/Layout";
import { Config } from "./shared/config/env";
import i18nProvider from "./shared/i18n";
import { appReducer } from "./shared/store/reducer";

const App = () => (
  <Admin
    title="React Admin Hasura"
    dataProvider={hasuraDataProvider(Config.dataHost, httpClient)}
    i18nProvider={i18nProvider}
    customRoutes={customRoutes}
    customReducers={appReducer}
    layout={Layout}
    login={Login}
    authProvider={authProvider}
  >
    {pageResources}
  </Admin>
);

export default App;
