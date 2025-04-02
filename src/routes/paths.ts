export enum RoutePaths {
  MAIN = '/',
  AUTH = '/auth/',
  //тут есть параметр type, его будем ставить как дефолтное значение authType
  SIGNOUT = '/signout',
  SITES = '/sites',
  SITES_NEW = '/sites/new',
  USER = '/user',
  USERDETAIL = '/user/id',
}

export const getRoutePathSiteDetail = (id: string) => `sites/${id}`
