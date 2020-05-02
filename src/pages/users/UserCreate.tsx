import * as React from "react";
import { Create, SelectInput, SimpleForm, TextInput } from "react-admin";
import { HASURA_ROLES } from "../../shared/types";

const choices = HASURA_ROLES.map((r) => ({
  id: r,
  name: r
}));

export const UserCreate = (props): JSX.Element => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="email" />
      <TextInput source="password" type="password" />
      <TextInput source="fullName" />
      <SelectInput source="role" choices={choices} />
    </SimpleForm>
  </Create>
);
