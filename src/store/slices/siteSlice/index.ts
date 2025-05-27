import { Block } from './types'
import {
  addBlock,
  deleteBlock,
  updateBlockPosition,
  updateBlockSize,
  updateBlockContent,
  resetLayout,
  setBlocks,
  setModalClose,
  setModalOpen,
  setSite,
  togglePreview,
} from './siteSlice'
import reducer from './siteSlice'

export type { Block }
export {
  reducer,
  addBlock as blockCreate,
  deleteBlock as blockDelete,
  updateBlockPosition as blockPositionUpdate,
  updateBlockSize as blockSizeUpdate,
  updateBlockContent as blockContentUpdate,
  resetLayout,
  setBlocks,
  setModalClose,
  setModalOpen,
  setSite,
  togglePreview,
}
