import { Edit, SimpleForm, TextInput, DateInput } from "react-admin"

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <DateInput source="createdAt" />
      <DateInput source="updatedAt" />
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="hashedPassword" />
      <TextInput source="role" />
    </SimpleForm>
  </Edit>
)
