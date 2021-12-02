import React from "react"
import { Admin, Resource } from "react-admin"
import blitzDataProvider from "../providers/data"
import blitzAuthProvider from "../providers/auth"
import { PostList } from "./PostList"
import { UserEdit } from "./UserEdit"
import { UserList } from "./UserList"
import { PostEdit } from "./PostEdit"
import { UserCreate } from "./UserCreate"
import { PostCreate } from "./PostCreate"

const ReactAdmin = () => {
  return (
    <Admin dataProvider={blitzDataProvider()} authProvider={blitzAuthProvider}>
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    </Admin>
  )
}

export default ReactAdmin
