import { Block } from './types'
import {
    updateSiteTitle,
    updateSiteBgColor,
    addBlock,
    deleteBlock,
    updateBlockPosition,
    updateBlockSize,
    updateBlockContent,
} from './layoutSiteSlice'
import reducer from './layoutSiteSlice'
import { SiteSlice } from './slice'


export const siteReducer = SiteSlice.reducer

export type { Block }

export {
    reducer as layoutSiteReducer,
    updateSiteTitle as blockTitleUpdate,
    updateSiteBgColor as blockBgColorUpdate,
    addBlock as blockCreate,
    deleteBlock as blockDelete,
    updateBlockPosition as blockPositionUpdate,
    updateBlockSize as blockSizeUpdate,
    updateBlockContent as blockContentUpdate,
}
