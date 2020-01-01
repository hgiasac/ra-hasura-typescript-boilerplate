// tslint:disable jsx-key
import React from "react";
import { EditGuesser, ListGuesser, Resource } from "react-admin";
import { Route } from "react-router";
import Configuration from "./Configuration";
import { UserCreate } from "./users/UserCreate";

export const pageResources = [
  <Resource
    key="users"
    name="users"
    list={ListGuesser}
    edit={EditGuesser}
    create={UserCreate}
  />,
];

export const customRoutes = [
  <Route exact={true} path="/configuration" render={() => <Configuration />} />,
];
