/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import buildHasuraProvider from "ra-data-hasura-graphql";
import * as React from "react";
import { Admin } from "react-admin";
import { customRoutes, pageResources } from "./pages";
import { authGQLClient } from "./shared/ApolloClient";
import { authProvider } from "./shared/AuthProvder";
import Login from "./shared/components/Auth/Login";
import { Layout } from "./shared/components/Layout";
import i18nProvider from "./shared/i18n";
import { appReducer } from "./shared/store/reducer";
import { sidebarRoutes } from "./pages/routes";

const App = (): JSX.Element => {
  const [resolvedDataProvider, setResolvedDataProvider] = React.useState();

  React.useEffect(() => {
    void (async () => {
      const dp = await buildHasuraProvider({ client: authGQLClient });
      setResolvedDataProvider(() => dp);
    })();
  }, []);

  if (!resolvedDataProvider) {
    return (<div>Loading...</div>);
  }

  return (
    <Admin
      title="React Admin Hasura"
      dataProvider={resolvedDataProvider}
      i18nProvider={i18nProvider}
      customRoutes={customRoutes}
      customReducers={appReducer}
      layout={(props) => <Layout sidebarRoutes={sidebarRoutes} {...props} />}
      login={Login}
      authProvider={authProvider}
    >
      {pageResources}
    </Admin>
  );
};

export default App;
