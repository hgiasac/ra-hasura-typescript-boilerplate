import * as React from "react";
import { Route } from "react-router";
import Configuration from "./Configuration";
import { userResources } from "./users";

type Renderer = () => JSX.Element;
export type CustomRoute = {
  readonly exact: boolean
  readonly path: string
  readonly render: Renderer
};

export const pageResources = [
  ...userResources
];

export const customRoutes = [{
  exact: true,
  path: "/configuration",
  render: () => <Configuration />
}].map((m) => (
  <Route {...m} key={m.path} />
));
