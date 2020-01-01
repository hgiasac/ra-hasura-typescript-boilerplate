import React from "react";
import { Layout, Sidebar } from "react-admin";
import { useSelector } from "react-redux";
import { IAppState, Theme } from "../../store/types";
import AppBar from "./AppBar";
import Menu from "./Menu";
import { darkTheme, lightTheme } from "./themes";

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

export default (props: any) => {
  const theme = useSelector((state: IAppState) =>
    state.config && state.config.theme === Theme.Dark ? darkTheme : lightTheme
  );

  return (
    <Layout
        {...props}
        appBar={AppBar}
        sidebar={CustomSidebar}
        menu={Menu}
        theme={theme}
    />
  );
};
