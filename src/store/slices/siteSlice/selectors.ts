import { RootState } from 'src/store/store'

export const selectorLayoutSiteData = (state: RootState) =>
  state.site.data.blocks
export const selectorPreview = (state: RootState) => state.site.isPreview
export const selectorModalOpen = (state: RootState) => state.site.isModalOpen
export const selectBlocks = (state: RootState) => state.site.data.blocks
export const selectSiteTitle = (state: RootState) => state.site.data.title
export const selectSiteBgColor = (state: RootState) => state.site.data.bgColor
export const selectBlockButton = (state: RootState) =>
  state.site.selectedBlockButton
export const selectEditingBlockId = (state: RootState) =>
  state.site.editingBlockId
export const selectMaxZIndex = (state: RootState) => state.site.maxZIndex

export const selectSiteData = (state: RootState) => state.site.data
