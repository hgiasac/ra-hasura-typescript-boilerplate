import * as React from "react";
import { Layout, Sidebar } from "react-admin";
import { useSelector } from "react-redux";
import { AppState, Theme } from "../../store/types";
import AppBar from "./AppBar";
import Menu, { RouteGroup } from "./Menu";
import { darkTheme, lightTheme } from "./themes";

const CustomSidebar = (props: any): JSX.Element =>
  <Sidebar {...props} size={200} />;

type Props = {
  readonly sidebarRoutes: readonly RouteGroup[]
};

export default (props: Props): JSX.Element => {
  const theme = useSelector((state: AppState) =>
    state.config && state.config.theme === Theme.Dark ? darkTheme : lightTheme
  );

  return (
    <Layout
      {...props}
      appBar={AppBar}
      sidebar={CustomSidebar}
      menu={(mProps) => <Menu subMenus={props.sidebarRoutes} {...mProps} />}
      theme={theme}
    />
  );
};
