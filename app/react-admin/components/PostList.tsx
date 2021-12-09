import React from "react"
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin"

const postFilters = [
  <TextInput key="search" source="q" label="Search" alwaysOn />,
  <ReferenceInput key="1" source="userId" label="User" reference="users" allowEmpty>
    <SelectInput optionText="name" />
  </ReferenceInput>,
]

export const PostList = (props) => (
  <List filters={postFilters} {...props} exporter={false}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="userId" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="content" />
      <BooleanField source="published" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
)
