import * as React from "react";
import { EditGuesser, ListGuesser, Resource } from "react-admin";
import { Route } from "react-router";
import Configuration from "./Configuration";
import { UserCreate } from "./users/UserCreate";

type Renderer = () => JSX.Element;
export type CustomRoute = {
  readonly exact: boolean
  readonly path: string
  readonly render: Renderer
};

export const pageResources = [
  <Resource
    key="users"
    name="users"
    list={ListGuesser}
    edit={EditGuesser}
    create={UserCreate}
  />
];

export const customRoutes = [{
  exact: true,
  path: "/configuration",
  render: () => <Configuration />
}].map((m) => (
  <Route {...m} key={m.path} />
));
