import React from "react"
import { Admin, Resource } from "react-admin"
import blitzDataProvider from "@theapexlab/ra-data-blitz"
import blitzAuthProvider from "../providers/auth"
import { PostList } from "./PostList"
import { UserEdit } from "./UserEdit"
import { UserList } from "./UserList"
import { PostEdit } from "./PostEdit"
import { UserCreate } from "./UserCreate"
import { PostCreate } from "./PostCreate"
import { invoke } from "blitz"
import { Prisma } from "db"

const searchEntities = (
  q: string
): { user: Prisma.UserWhereInput; post: Prisma.PostWhereInput } => ({
  user: {
    OR: [
      {
        email: {
          contains: q,
        },
      },
      {
        name: {
          contains: q,
        },
      },
    ],
  },
  post: {
    OR: [
      {
        title: {
          contains: q,
        },
      },
      {
        content: {
          contains: q,
        },
      },
    ],
  },
})

const ReactAdmin = () => {
  return (
    <Admin
      dataProvider={blitzDataProvider({ invoke, searchEntities })}
      authProvider={blitzAuthProvider}
    >
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    </Admin>
  )
}

export default ReactAdmin
