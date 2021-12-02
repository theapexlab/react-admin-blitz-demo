import { GetListParams } from "ra-core"
import { GetQueryModuleParams as GetHandlerParams, QueryMethod } from "./types"
import { invoke } from "blitz"

const MAX_TAKE = 250

export const getEntityNameFromResource = (resource: string) => {
  const entityName = resource.charAt(0).toUpperCase() + resource.slice(1, -1)
  return entityName
}

export const getPluralEntityName = (entityName: string) => {
  return `${entityName}s`
}

export const mapFilters = (params) => {
  const { q, ...filters } = params.filter || {}
  // TODO: add the ability for the user to add custom mapping
  const search = q
    ? {
        email: {
          contains: q,
        },
      }
    : undefined

  return {
    where: {
      ...search,
      ...filters,
    },
  }
}

export const mapPaginationAndSort = (params: GetListParams) => {
  const { page, perPage } = params.pagination
  const { field, order } = params.sort

  return {
    orderBy: {
      [field]: order.toLowerCase(),
    },
    skip: (page - 1) * perPage,
    // TODO: somehow get MAX_TAKE from config?
    take: perPage > MAX_TAKE ? MAX_TAKE : perPage,
  }
}

export const getHandler = async ({
  resource,
  method = QueryMethod.Get,
  plural = false,
}: GetHandlerParams) => {
  if (!["create", "get", "update", "delete"].includes(method)) {
    throw new Error("Unknown method")
  }

  const entityName = getEntityNameFromResource(resource)
  const folder = method === QueryMethod.Get ? "queries" : "mutations"

  const queryModule = await import(
    `app/${resource}/${folder}/${method}${plural ? getPluralEntityName(entityName) : entityName}.ts`
  )

  return async (params) => invoke(queryModule.default, params)
}
