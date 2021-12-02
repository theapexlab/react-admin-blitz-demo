import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from "react-admin"

export const PostEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <DateInput source="createdAt" />
      <DateInput source="updatedAt" />
      <TextInput source="title" />
      <TextInput source="content" />
      <BooleanInput source="published" />
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)
