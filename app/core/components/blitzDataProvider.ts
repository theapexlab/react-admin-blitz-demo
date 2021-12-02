import { DataProvider, GetListParams } from "ra-core"

const getEntityNameFromResource = (resource: string) => {
  const entityName = resource.charAt(0).toUpperCase() + resource.slice(1, -1)
  return entityName
}

const getPluralEntityName = (entityName: string) => {
  return `${entityName}s`
}

const mapSearch = (params) => {
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

const mapPaginationParams = (params: GetListParams) => {
  const { page, perPage } = params.pagination
  const { field, order } = params.sort

  return {
    orderBy: {
      [field]: order.toLowerCase(),
    },
    skip: (page - 1) * perPage,
    take: perPage,
  }
}

enum QueryMethod {
  Get = "get",
  Update = "update",
  Create = "create",
  Delete = "delete",
}

type GetQueryModuleParams = {
  resource: string
  method?: QueryMethod
  plural?: boolean
}

const getQueryModule = async ({
  resource,
  method = QueryMethod.Get,
  plural = false,
}: GetQueryModuleParams) => {
  if (!["create", "get", "update", "delete"].includes(method)) {
    throw new Error("Unknown method")
  }

  const entityName = getEntityNameFromResource(resource)
  const folder = method === QueryMethod.Get ? "queries" : "mutations"

  return import(
    `app/${resource}/${folder}/${method}${plural ? getPluralEntityName(entityName) : entityName}.ts`
  )
}

const provider = (): DataProvider => ({
  getList: async (resource, params) => {
    const queryModule: any = await getQueryModule({ resource, plural: true })
    const query = await queryModule.default(
      { ...mapPaginationParams(params), ...mapSearch(params) },
      {} as any
    )

    return {
      data: query[resource],
      total: query.count,
    }
  },
  getOne: async (resource, params) => {
    const id = params.id as string
    const queryModule: any = await getQueryModule({ resource })
    const query = await queryModule.default({ id: parseInt(id) }, {} as any)
    return {
      data: query,
    }
  },

  getMany: async (resource, params) => {
    const queryModule: any = await getQueryModule({ resource, plural: true })
    const query = await queryModule.default(
      {
        where: {
          id: {
            in: params.ids,
          },
        },
      },
      {} as any
    )

    return {
      data: query[resource],
    }
  },

  getManyReference: async (resource, params) => {
    const queryModule: any = await getQueryModule({ resource, plural: true })
    const query = await queryModule.default(
      {
        ...mapPaginationParams(params),
        ...{
          where: {
            id: params.id,
          },
          includes: {
            [params.target]: true,
          },
        },
      },
      {} as any
    )

    return {
      data: query[resource][params.target],
      total: query.count,
    }
  },

  update: async (resource, params) => {
    const queryModule: any = await getQueryModule({ resource, method: QueryMethod.Update })
    const query = await queryModule.default(
      {
        id: params.id,
        ...params.data,
      },
      {} as any
    )

    return { data: query }
  },

  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map(async (id) => {
        const queryModule: any = await getQueryModule({
          resource,
          method: QueryMethod.Update,
        })
        return await queryModule.default(
          {
            id,
            ...params.data,
          },
          {} as any
        )
      })
    )
    return { data: responses.map((data) => data.id) }
  },

  create: async (resource, params) => {
    const queryModule: any = await getQueryModule({ resource, method: QueryMethod.Create })
    const query = await queryModule.default(
      {
        ...params.data,
      },
      {} as any
    )

    return {
      data: query,
    }
  },

  delete: async (resource, params) => {
    const queryModule: any = await getQueryModule({ resource, method: QueryMethod.Delete })
    const query = await queryModule.default(
      {
        id: params.id,
      },
      {} as any
    )

    return { data: query }
  },

  deleteMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map(async (id) => {
        const queryModule: any = await getQueryModule({
          resource,
          method: QueryMethod.Delete,
        })
        return await queryModule.default(
          {
            id,
          },
          {} as any
        )
      })
    )
    return { data: responses.map((data) => data.id) }
  },
})

export default provider
