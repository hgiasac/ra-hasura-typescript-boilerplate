// tslint:disable jsx-key
import { ListGuesser } from "ra-ui-materialui";
import React from "react";
import { Resource } from "react-admin";
import { Route } from "react-router";
import Configuration from "./Configuration";

export const pageResources = [
  <Resource key="users" name="users" list={ListGuesser} />,
];

export const customRoutes = [
  <Route exact={true} path="/configuration" render={() => <Configuration />} />,
];
