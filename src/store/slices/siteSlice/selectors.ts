import { RootState } from 'src/store/store'

export const selectorLayoutSiteData = (state: RootState) =>
    state.layoutSite.blocks
// export const selectorLayoutSiteTitle = (state: RootState) =>
//   state.ties?.title
// export const selectorLayoutSiteBgColor = (state: RootState) =>
//   state.layoutSite.entities?.bgColor

export const selectorPreview = (state: RootState) => state.layoutSite.isPreview

export const selectorModalOpen = (state: RootState) =>
    state.layoutSite.isModalOpen
export const selectBlocks = (state: RootState) =>
    state.layoutSite.blocks
// state.layoutSite.entities?.data
export const selectSiteTitle = (state: RootState) =>
    state.layoutSite.title
export const selectSiteBgColor = (state: RootState) =>
    state.layoutSite.bgColor
