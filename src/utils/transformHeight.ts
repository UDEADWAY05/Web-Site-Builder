import type { Block } from './../store/slices/siteSlice/types'

export function transformHeight(block: Block) {
  let height
  if (!block.dimentions.height) height = 'auto'
  else {
    height = `${block.dimentions.height}px`
  }
  return height
}
