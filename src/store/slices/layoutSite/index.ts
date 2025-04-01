import { Block } from './types'
import {
  blockTitleUpdate,
  blockBgColorUpdate,
  blockCreate,
  blockDelete,
  blockPositionUpdate,
  blockSizeUpdate,
  blockContentUpdate,
} from './layoutSiteSlice'
import reducer from './layoutSiteSlice'

export type { Block }
export {
  reducer,
  blockTitleUpdate,
  blockBgColorUpdate,
  blockCreate,
  blockDelete,
  blockPositionUpdate,
  blockSizeUpdate,
  blockContentUpdate,
}
