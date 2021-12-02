export enum QueryMethod {
  Get = "get",
  Update = "update",
  Create = "create",
  Delete = "delete",
}

export type GetQueryModuleParams = {
  resource: string
  method?: QueryMethod
  plural?: boolean
}
