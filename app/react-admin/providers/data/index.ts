import { DataProvider } from "ra-core"
import { QueryMethod } from "./types"
import { getHandler, mapPaginationAndSort, mapFilters } from "./utils"

const provider = (): DataProvider => ({
  getList: async (resource, params) => {
    const handler = await getHandler({ resource, plural: true })
    const data = await handler({ ...mapPaginationAndSort(params), ...mapFilters(params) })

    return {
      data: data[resource],
      total: data.count,
    }
  },

  getOne: async (resource, params) => {
    const id = params.id as string
    const handler = await getHandler({ resource })
    const data = await handler({ id: parseInt(id) })
    return {
      data,
    }
  },

  getMany: async (resource, params) => {
    const handler = await getHandler({ resource, plural: true })
    const data = await handler({
      where: {
        id: {
          in: params.ids,
        },
      },
    })

    return {
      data: data[resource],
    }
  },

  getManyReference: async (resource, params) => {
    const handler = await getHandler({ resource, plural: true })
    const data = await handler({
      ...mapPaginationAndSort(params),
      ...{
        where: {
          id: params.id,
        },
        includes: {
          [params.target]: true,
        },
      },
    })

    return {
      data: data[resource][params.target],
      total: data.count,
    }
  },

  update: async (resource, params) => {
    const handler = await getHandler({ resource, method: QueryMethod.Update })
    const data = await handler({
      id: params.id,
      ...params.data,
    })

    return { data }
  },

  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map(async (id) => {
        const handler = await getHandler({
          resource,
          method: QueryMethod.Update,
        })
        return handler({
          id,
          ...params.data,
        })
      })
    )
    return { data: responses.map((data) => data.id) }
  },

  create: async (resource, params) => {
    const handler = await getHandler({ resource, method: QueryMethod.Create })
    const data = await handler({
      ...params.data,
    })

    return {
      data,
    }
  },

  delete: async (resource, params) => {
    const handler = await getHandler({ resource, method: QueryMethod.Delete })
    const data = await handler({
      id: params.id,
    })

    return { data }
  },

  deleteMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map(async (id) => {
        const handler = await getHandler({
          resource,
          method: QueryMethod.Delete,
        })
        return handler({
          id,
        })
      })
    )
    return { data: responses.map((data) => data.id) }
  },
})

export default provider
