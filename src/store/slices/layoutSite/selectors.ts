import { RootState } from 'src/store/store'

export const selectorLayoutSiteData = (state: RootState) =>
  state.layoutSite.entities?.data
export const selectorLayoutSiteTitle = (state: RootState) =>
  state.layoutSite.entities?.title
export const selectorLayoutSiteBgColor = (state: RootState) =>
  state.layoutSite.entities?.bgColor

export const selectorPreview = (state: RootState) => state.layoutSite.isPreview

export const selectorModalOpen = (state: RootState) =>
  state.layoutSite.isModalOpen
