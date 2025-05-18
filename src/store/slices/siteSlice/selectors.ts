import { RootState } from 'src/store/store'

export const selectorLayoutSiteData = (state: RootState) => state.site.blocks
export const selectorPreview = (state: RootState) => state.site.isPreview
export const selectorModalOpen = (state: RootState) => state.site.isModalOpen
export const selectBlocks = (state: RootState) => state.site.blocks
export const selectSiteTitle = (state: RootState) => state.site.title
export const selectSiteBgColor = (state: RootState) => state.site.bgColor
export const selectBlockButton = (state: RootState) =>
  state.site.selectedBlockButton
// export const selectBlockId = (state: RootState) => state.site.selectedBlockId
export const selectEditingBlockId = (state: RootState) =>
  state.site.editingBlockId
export const selectMaxZIndex = (state: RootState) => state.site.maxZIndex
