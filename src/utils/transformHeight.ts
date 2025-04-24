import type { Block } from './../store/slices/siteSlice/types'

export function transformHeight(block: Block) {
  let height
  if (!block.styles?.height) height = 'auto'
  else {
    height = `${block.styles?.height}px`
  }
  return height
}
