import {
  List,
  Datagrid,
  TextField,
  DateField,
  EmailField,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin"

const userFilters = [
  <TextInput key="search" source="q" label="Search" alwaysOn />,
  <ReferenceInput key="asdf" source="id" label="User" reference="users" allowEmpty>
    <SelectInput optionText="name" />
  </ReferenceInput>,
]

export const UserList = (props) => (
  <List filters={userFilters} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="role" />
    </Datagrid>
  </List>
)
