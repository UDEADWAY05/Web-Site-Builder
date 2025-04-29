import { RootState } from 'src/store/store'

export const selectorLayoutSiteData = (state: RootState) =>
  state.site.blocks
// export const selectorLayoutSiteTitle = (state: RootState) =>
//   state.ties?.title
// export const selectorLayoutSiteBgColor = (state: RootState) =>
//   state.layoutSite.entities?.bgColor

export const selectorPreview = (state: RootState) => state.site.isPreview

export const selectorModalOpen = (state: RootState) =>
  state.site.isModalOpen
export const selectBlocks = (state: RootState) =>
  state.site.blocks
  // state.layoutSite.entities?.data
export const selectSiteTitle = (state: RootState) =>
  state.site.title
export const selectSiteBgColor = (state: RootState) =>
  state.site.bgColor
export const selectActiveBlockButton = (state:RootState) => state.site.selectedBlockButton

export const selectActiveBlockId = (state:RootState) => state.site.activeBlockId