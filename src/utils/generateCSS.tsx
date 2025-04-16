import type { Block } from 'src/store/slices/siteSlice'
import { generateCSSCode } from 'src/utils/generateCSSCode'

export function generateCSS(blocks: Block[]) {
  return blocks?.map((block) => generateCSSCode(block)).join('\n')
}
