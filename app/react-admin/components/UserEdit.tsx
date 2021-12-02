import { Edit, SimpleForm, TextInput, DateInput } from "react-admin"

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="hashedPassword" />
      <TextInput source="role" />
    </SimpleForm>
  </Edit>
)
