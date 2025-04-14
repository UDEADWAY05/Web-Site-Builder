import { Block } from './types'
import {
  updateSiteTitle,
  updateSiteBgColor,
  addBlock,
  deleteBlock,
  updateBlockPosition,
  updateBlockSize,
  updateBlockContent,
} from './siteSlice'
import reducer from './siteSlice'

export type { Block }
export {
  reducer,
  updateSiteTitle as blockTitleUpdate,
  updateSiteBgColor as blockBgColorUpdate,
  addBlock as blockCreate,
  deleteBlock as blockDelete,
  updateBlockPosition as blockPositionUpdate,
  updateBlockSize as blockSizeUpdate,
  updateBlockContent as blockContentUpdate,
}
