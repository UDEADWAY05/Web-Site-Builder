import { RootState } from 'src/store/store'

export const selectorLayoutSite = (state: RootState) =>
  state.layoutSite.entities
export const selectorLayoutSiteData = (state: RootState) =>
  state.layoutSite.entities.data
export const selectorLayoutSiteTitle = (state: RootState) =>
  state.layoutSite.entities.title
export const selectorLayoutSiteBgColor = (state: RootState) =>
  state.layoutSite.entities.bgColor
