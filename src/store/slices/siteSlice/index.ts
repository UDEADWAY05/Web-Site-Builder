import { Block } from './types'
import { layoutSiteSlice } from './layoutSiteSlice'
import { SiteSlice } from './slice'

export const layoutSiteReducer = layoutSiteSlice.reducer
export const siteReducer = SiteSlice.reducer

export type { Block }

export const {
    setSite,
    resetLayout,
    togglePreview,
    setModalClose,
    setModalOpen,
    setBlocks,
    updateSiteTitle,
    updateSiteBgColor,
    addBlock,
    deleteBlock,
    updateBlockPosition,
    updateBlockSize,
    updateBlockContent,
    updateBlockBgColor,
    updateBlockStyles
} = layoutSiteSlice.actions