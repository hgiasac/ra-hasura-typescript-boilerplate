import * as React from "react";
import { Create, SelectInput, SimpleForm, TextInput } from "react-admin";
import { HASURA_ROLES } from "../../shared/types";

const choices = HASURA_ROLES.map((r) => ({
  id: r,
  name: r
}));

type Props = {

};
export default (props: Props): JSX.Element => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="email" />
      <TextInput source="password" type="password" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <SelectInput source="role" choices={choices} />
    </SimpleForm>
  </Create>
);
