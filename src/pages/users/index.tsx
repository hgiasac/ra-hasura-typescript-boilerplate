import * as React from "react";
import { EditGuesser, ListGuesser, Resource } from "react-admin";
import UserCreate from "./UserCreate";

export const userResources = [
  <Resource
    key="users"
    name="users"
    list={ListGuesser}
    edit={EditGuesser}
    create={UserCreate}
  />
];
