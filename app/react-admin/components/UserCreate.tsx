import { Create, SimpleForm, TextInput, DateInput } from "react-admin"
export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="hashedPassword" />
      <TextInput source="role" />
    </SimpleForm>
  </Create>
)
