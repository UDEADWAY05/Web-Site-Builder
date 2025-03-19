export enum RoutePaths {
  MAIN = '/',
  AUTH = '/auth/:type', //тут есть параметр type, его будем ставить как дефолтное значение authType
  SIGNOUT = 'signout',
  SITE = 'site',
  SITE_NEW = 'site/new',
  USER = 'user',
  USERDETAIL = 'user/id',
}
