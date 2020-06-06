import * as React from "react";
import { Create, SelectInput, SimpleForm, TextInput } from "react-admin";
import { Roles } from "../../shared/types";

const choices = Roles.map((r) => ({
  id: r,
  name: r
}));

type Props = {

};
export const UserCreate = (props: Props): JSX.Element => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="email" />
      <TextInput source="password" type="password" />
      <TextInput source="fullName" />
      <SelectInput source="role" choices={choices} />
    </SimpleForm>
  </Create>
);
