import type { Block } from './../store/slices/siteSlice/types'

export function transformHeight(block: Block) {
  let height
  if (!block.dimensions.height) height = 'auto'
  else {
    height = `${block.dimensions.height}px`
  }
  return height
}
