import hasuraDataProvider from "ra-data-hasura";
import React from "react";
import { Admin } from "react-admin";
import { customRoutes, pageResources } from "./pages";
import { Layout } from "./shared/components/Layout";
import { Config } from "./shared/config/env";
import i18nProvider from "./shared/i18n";
import { appReducer } from "./shared/store/reducer";

const App = () => (
  <Admin
    dataProvider={hasuraDataProvider(Config.dataHost)}
    i18nProvider={i18nProvider}
    customRoutes={customRoutes}
    customReducers={appReducer}
    layout={Layout}
  >
    {pageResources}
  </Admin>
);

export default App;
