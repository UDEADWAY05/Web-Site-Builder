import type { Block } from 'src/store/slices/siteSlice'

export function transformWidth(block: Block) {
  let width
  if (block.type === 'divider') {
    width = '100%'
  } else {
    if (!block.dimensions.width) {
      width = 'auto'
    } else {
      width = `${block.dimensions.width}px`
    }
  }

  return width
}
