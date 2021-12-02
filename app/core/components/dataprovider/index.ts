import { QueryMethod } from "app/react-admin/providers/data/types"
import {
  getQueryModule,
  mapPaginationParams,
  mapSearch,
} from "app/react-admin/providers/data/utils"
import { DataProvider } from "ra-core"

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
