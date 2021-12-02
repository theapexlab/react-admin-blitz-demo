import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from "react-admin"

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <DateInput source="createdAt" />
      <DateInput source="updatedAt" />
      <TextInput source="title" />
      <TextInput source="content" />
      <BooleanInput source="published" />
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
