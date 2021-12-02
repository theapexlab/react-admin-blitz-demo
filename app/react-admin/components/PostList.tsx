import { List, Datagrid, TextField, DateField, BooleanField, ReferenceField } from "react-admin"

export const PostList = (props) => (
  <List {...props} exporter={false}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <TextField source="title" />
      <TextField source="content" />
      <BooleanField source="published" />
      <ReferenceField source="userId" reference="users">
        <TextField source="id" />
      </ReferenceField>
    </Datagrid>
  </List>
)
