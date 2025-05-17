import type { Block } from 'src/store/slices/siteSlice'

export function transformWidth(block: Block) {
  let width
  if (block.type === 'divider') {
    width = '100%'
  } else {
    if (!block.dimentions.width) {
      width = 'auto'
    } else {
      width = `${block.dimentions.width}px`
    }
  }

  return width
}
