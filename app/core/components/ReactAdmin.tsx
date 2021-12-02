import React from "react"
import { Admin, Resource, EditGuesser, ListGuesser } from "react-admin"
import blitzDataProvider from "./blitzDataProvider"
import { PostList } from "./PostList"
import { UserEdit } from "./UserEdit"
import { UserList } from "./UserList"

const dataProvider = blitzDataProvider()

const ReactAdmin = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} edit={UserEdit} />
      <Resource name="posts" list={PostList} />
    </Admin>
  )
}

export default ReactAdmin
