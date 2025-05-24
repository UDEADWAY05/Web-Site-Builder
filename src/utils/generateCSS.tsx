import type { Block } from 'src/store/slices/siteSlice'
import { generateCSSCode } from 'src/utils/generateCSSCode'

export function generateCSS(blocks: Block[]) {
  if (!blocks) {
    return ''
  }
  return blocks.map((block) => generateCSSCode(block)).join('\n')
}
